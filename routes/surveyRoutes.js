const { Path } = require('path-parser');
const URL = require('url');
const _ = require('lodash');
const fs = require('fs');
const defaultPath = require('path');
const requireLogin = require("../middlewares/requireLogin");
const requireCredit = require("../middlewares/requireCredit");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const Survey = mongoose.model("Survey");


mongoose.set('useFindAndModify', false);

module.exports = app => {

    app.get("/api/survey/:surveyId/:choice", (req, res) => {
        res.send("Thanks For the Voting!!");
    });

    app.get("/api/surveys", requireLogin, async (req, res) => {
        const surveysList = await Survey.find({ _user: req.user._id }).select({ recipients: 0 });
        res.send(surveysList);
    });

    app.post("/api/survey/webhooks", (req, res) => {
        const path = new Path('/api/survey/:surveyId/:choice');
        const uniqueEvents = _.chain(req.body)
            .filter(obj => obj.event == 'click')
            .map(({ email, url }) => {
                const match = path.test(URL.parse(url, true).pathname);
                if (match) {
                    return { email, surveyId: match.surveyId, choice: match.choice }
                }
            })
            .compact()
            .uniqBy('email', 'surveyId')
            .value();

        uniqueEvents.map(async ({ email, surveyId, choice }) => {
            if (mongoose.Types.ObjectId.isValid(surveyId)) {
                const update = await Survey.findOneAndUpdate(
                    {
                        _id: surveyId,
                        recipients: { $elemMatch: { email: email, responded: false } }
                    },
                    {
                        $inc: { [choice]: 1 },
                        $set: { 'recipients.$.responded': true },
                        $currentDate: { 'lastRespondedOn': "date" }
                    },
                    { new: true }).exec();
            }
        });
        res.send({});
    });

    app.post('/api/survey', requireLogin, requireCredit, async (req, res) => {
        const { title, body, subject, recipientExcel } = req.body;
        const recipients = recipientExcel.filter(array => array.length > 0);
        const survey = new Survey({
            title,
            body,
            subject,
            recipients: recipients.map(email => ({ email: email[0].trim() })),
            dateSent: Date.now(),
            _user: req.user.id
        });
        const mailer = new Mailer(survey, surveyTemplate(survey));
        try {
            await mailer.send();
            await survey.save();
            req.user.credits -= 50;
            req.user = await req.user.save();
            res.send(req.user);
        } catch (error) {
            res.status(422).send(error);
        }
    })
}

//IT EXPORT THE CLASS
const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');


class Mailer extends helper.Mail {
    //Constructor
    constructor({ subject, recipients }, content) {
        super();
        this.sgApi = sendgrid(keys.sendGridApi);
        this.from_email = new helper.Email('no-reply@emaily.com', 'Emaily');
        this.subject = subject;
        this.body = new helper.Content('text/html', content);
        this.recipients = this.formatAddresses(recipients);

        this.addContent(this.body);
        this.addClickTracking();
        this.addRecipients();

    }

    formatAddresses(recipients) {
        return recipients.map(({ email }) => {
            return new helper.Email(email, "Emaily.com");
        })
    }

    addClickTracking() {
        const trackingSettings = new helper.TrackingSettings();
        //console.log(trackingSettings);
        const clickTracking = new helper.ClickTracking(true, true);

        trackingSettings.setClickTracking(clickTracking);
        //console.log(clickTracking);
        //console.log(trackingSettings);
        this.addTrackingSettings(trackingSettings);
    }

    addRecipients() {
        const personalize = new helper.Personalization();
        this.recipients.forEach(recipient => {
            personalize.addTo(recipient);
        })
        this.addPersonalization(personalize);
    }

    async send() {
        const request = this.sgApi.emptyRequest({
            method: "POST",
            path: '/v3/mail/send',
            body: this.toJSON()
        })

        //console.log("---------------------------------------------------------------" + request)
        try {
            //listing messages in users mailbox 
            const response = await this.sgApi.API(request);
            return response;
        } catch (err) {
            console.log(err.response.body.errors[0]);
        }
    }
}


module.exports = Mailer;
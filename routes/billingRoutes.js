const keys = require("../config/keys");
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require("../middlewares/requireLogin")
module.exports = app => {
    app.post("/api/stripe", requireLogin, async (req, res) => {
        const charge = await stripe.charges.create(
            {
                amount: 10000,
                currency: 'INR',
                source: req.body.id,
                description: '(Recharge 100 Credits to Your wallet)',
            }
        );

        req.user.credits += 100;
        const user = await req.user.save();
        res.send(user);

    })
}
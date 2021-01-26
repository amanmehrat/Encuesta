const keys = require("../config/keys");
const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, keys.JWTSecretKey, (err, user) => {
            if (err) {
                return res.status(500).send({ error: "Unable to verify token" });
            }
            req.user = user.data;
            next();
        });
    } else {
        return res.status(500).send({ error: "token is missing" });
    }
}
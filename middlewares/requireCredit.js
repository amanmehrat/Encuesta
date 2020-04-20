module.exports = (req, res, next) => {
    //console.log(req.user);
    if (req.user.credits < 50) {
        return res.status(403).send({ error: "Not Enough Credits!" });
    }
    next();
}
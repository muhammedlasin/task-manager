const User = require("../models/User")
const jwt = require("jsonwebtoken")

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '')
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
        if (!user) {
            throw new Error()
        }
        req.user = user
        req.token = token
    }
    catch (e) {
        res.status(401).send({ error: 'please authenticate' })
    }
    next()
}

module.exports = auth
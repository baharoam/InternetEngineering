const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const userModel = require('../../models/UserModel')
const AUTH_JWT_OPTIONS = { expiresIn: '1h' }
const AUTH_JWT_SECRET = 'TOP-SECRET'

router.post('/', async (req, resp) => {

    const { username, password } = req.body

    const user = await userModel.findOne({
        $or: [
            { email: username },
            { username }
        ]
    })

    if (!!user) {
        if (user.password === password) {
            jwt.sign({ userId: user._id }, AUTH_JWT_SECRET, AUTH_JWT_OPTIONS, (err, token) => {

                if (err) throw err

                return resp.status(200).json({
                    status: "success",
                    token,
                    userId: user._id
                })
            })

        }
    } else {
        return resp.json({
            status: "error",
            msg: "your password or username is incurrect"
        })
    }





})


module.exports = router
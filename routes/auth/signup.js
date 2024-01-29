const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const userModel = require('../../models/UserModel')
const AUTH_JWT_OPTIONS = { expiresIn: '1h' }
const AUTH_JWT_SECRET = 'TOP-SECRET'

router.post('/', async (req, resp) => {

    const { email, password } = req.body

    const user = await userModel.findOne({ email })

    if (!!user) {

        resp.json({
            status: "error",
            msg: "Email Already Exist"
        })
    } else {

        userModel.create({
            email, password
        }).then(newUser => {

            resp.json({
                status: "success",
                msg: "your regster successfuly",
                token: jwt.sign({ userId: newUser._id }, AUTH_JWT_SECRET, AUTH_JWT_OPTIONS),
                userId: newUser._id
            })

        }).catch(e => {
            console.log(e);
        })
    }
})

module.exports = router
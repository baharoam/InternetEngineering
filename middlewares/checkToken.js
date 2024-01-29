const express = require('express')
const userModel = require('../models/UserModel')
const jwt = require('jsonwebtoken')
const router = express.Router()


router.use(async (req, resp, next) => {
    const token = req.headers.authorization

    try {

        if (token) {
            const { userId } = jwt.decode(token)

            const user = await userModel.findOne({ _id: userId })

            // console.log(user);

            if (!!user) {

                return next()
            } else {

                resp.status(401).json({ error: "unauthorized" })

            }

        } else {

            resp.status(401).json({ error: "unauthorized" })

        }


    } catch (e) {

        resp.status(401).json({ error: "unauthorized" })


    }






})




module.exports = router

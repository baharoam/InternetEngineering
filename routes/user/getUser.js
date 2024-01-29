const express = require('express')
const UserModel = require('../../models/UserModel')
const router = express.Router()
const jwt = require('jsonwebtoken')




router.get('/', async (req, resp) => {



    try {

        const token = req.headers.authorization

        const { userId } = jwt.decode(token)

        const user = await UserModel.findById({ _id: userId })

        if (!!user) {
            return resp.json({ userInfo: user, status: "success" })
        } else {
            return resp.json({
                msg: "این محصول یافت نشد!"
            })
        }


    } catch (e) {
        return resp.json({
            msg: "این محصول یافت نشد!"
        })
    }


})





module.exports = router
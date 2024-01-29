const express = require('express')
const router = express.Router()
const userModel = require('../../models/UserModel')

const jwt = require('jsonwebtoken')

router.get('/:userId2', async (req, resp) => {

    const { userId2 } = req.params

    try {
        const token = req.headers.authorization

        const { userId: userId1 } = jwt.decode(token)

        const user1 = await userModel.findOne({ _id: userId1 })//me
        const user2 = await userModel.findOne({ _id: userId2 })//folowed

        user1.folowing = [...user1.folowing, user2._id]
        user2.folowers = [...user2.folowers, user1._id]

        user1.save()
        user2.save()

        resp.json({
            status: "success",
            username: user2.username
        })




    } catch (e) {

        console.log(e);

    }


})





module.exports = router
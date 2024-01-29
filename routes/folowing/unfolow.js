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

        // const copyfolowing = [...user1.folowing]
        // const copyfolowers = [...user2.folowers]

        const copyfolowing = JSON.parse(JSON.stringify(user1.folowing))
        const copyfolowers = JSON.parse(JSON.stringify(user2.folowers))



        // console.log(copyfolowing, "copyfolowing");
        // console.log(copyfolowers, "copyfolowers");

        const newFolowing1 = copyfolowing.filter(folowing1 => folowing1 != user2._id)
        const newfolowers2 = copyfolowers.filter(folowers2 => folowers2 != user1._id)

        // console.log(newFolowing1, "copyfolowing");
        // console.log(newfolowers2, "copyfolowers");

        user1.folowing = newFolowing1
        user2.folowers = newfolowers2

        user1.save()
        user2.save()

        resp.json({
            status: "successsss",
            username: user2.email
        })

    } catch (e) {

        console.log(e);

    }


})





module.exports = router
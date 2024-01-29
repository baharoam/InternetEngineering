const express = require('express')
const UserModel = require('../../models/UserModel')
const router = express.Router()
const jwt = require('jsonwebtoken')





router.get('/', async (req, resp) => {

    try {
        const token = req.headers.authorization

        if (!!token) {
            const { userId } = jwt.decode(token)
            const users = await UserModel.find({ _id: { $ne: userId } }).select([
                "email",
                "username",
                "profile",
                "folowers"
            ])
            const newUsers = JSON.parse(JSON.stringify(users));

            const result = newUsers.map(user2 => {
                const IFolowed = user2.folowers.includes(userId)
                return {
                    ...user2,
                    folowed: IFolowed
                }
            })

            return resp.json(result)
        } else {
            const users = await UserModel.find().select([
                "email",
                "username",
                "profile"
            ]);
            return resp.json(users)


        }



    } catch (e) {

        console.log(e);

    }




})

module.exports = router
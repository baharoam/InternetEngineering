const express = require('express')
const router = express.Router()
const UserModel = require('../../models/UserModel')



router.get('/', async (req, resp) => {
    const { search } = req.query

    const users = await UserModel.find()

    let result = []

    users.forEach(user => {

        if (user.username) {

            if (user.username.startsWith(search)) {
                result.push(user)
            }

        }

    })

    return resp.json(result)




})





module.exports = router
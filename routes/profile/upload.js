const express = require('express')
const router = express.Router()
const userModel = require('../../models/UserModel')
const jwt = require('jsonwebtoken')




const multer = require('multer')
const upload = multer({ dest: './uploads/profiles' })
router.post('/', upload.single('uploaded_file'), async function (req, resp) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    console.log(req.file, req.body)



    try {
        const token = req.headers.authorization

        const { userId } = jwt.decode(token)

        if (!!token) {
            const { username } = req.body
            const user = await userModel.findOne({ username })

            if (!!user && username != user.username) {

                if (!!req.file) {
                    const { filename } = req.file
                    user.profile = filename
                    user.save()
                }

                return resp.json({
                    status: "error",
                    msg: "This username Already taken. "
                })
            } else {
                const newUser = await userModel.findOne({ _id: userId })
                if (!!req.file) {
                    const { filename } = req.file
                    newUser.profile = filename
                    newUser.username = username
                    newUser.save()

                    return resp.json({
                        status: "success",
                        msg: "profile chenged!"
                    })


                } else {

                    newUser.username = username
                    newUser.save()

                }

                return resp.json({
                    status: "success",
                    msg: "profile chenged!"
                })
            }
        } else {

            return resp.json({
                status: "error",
                msg: "Access denied! "
            })



        }



    } catch (e) {
        console.log(e);
    }






});


module.exports = router
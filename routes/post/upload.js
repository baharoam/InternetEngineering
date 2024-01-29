const express = require('express')
const router = express.Router()
const postModel = require('../../models/PostModel')
const userModel = require('../../models/UserModel')
const jwt = require('jsonwebtoken')

const multer = require('multer')
const upload = multer({ dest: './uploads/posts' })



router.post('/', upload.single('uploaded_file'), async function (req, resp) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any 
    // console.log(req.file, req.body)



    try {
        const token = req.headers.authorization

        const { userId } = jwt.decode(token)

        console.log(req.body);



        if (!!token) {
            if (req.file && req.body.text) {
                const { text, hashtags, retwitte } = req.body

                console.log(retwitte);
                const { filename } = req.file
                const user = await userModel.findOne({ _id: userId })
                const newPost = await postModel.create({
                    text,
                    file: filename,
                    user: user._id,
                    hashtags,
                    retwitte
                })

                user.posts = [...user.posts, newPost._id]

                user.save()

                return resp.json(newPost)

            } else if (req.file) {
                const { filename } = req.file
                const { retwitte } = req.body

                const user = await userModel.findOne({ _id: userId })
                const newPost = await postModel.create({
                    file: filename,
                    user: user._id,
                    retwitte
                })

                user.posts = [...user.posts, newPost._id]
                user.save()

                return resp.json(newPost)

            } else {

                const { text, hashtags, retwitte } = req.body
                const user = await userModel.findOne({ _id: userId })
                const newPost = await postModel.create({
                    text,
                    user: user._id,
                    hashtags,
                    retwitte
                })

                user.posts = [...user.posts, newPost._id]
                user.save()

                return resp.json(newPost)

            }

        } else {

            return resp.json({
                status: "error",
                msg: "Access denied! "
            })

        }



    } catch (e) {
        // console.log(e);
    }






});


module.exports = router
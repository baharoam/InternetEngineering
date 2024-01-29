const express = require('express')
const router = express.Router()
const postModel = require('../../models/PostModel')
const userModel = require('../../models/UserModel')
const jwt = require('jsonwebtoken')
const fs = require('fs')
router.delete('/:postId', async (req, resp) => {

    try {
        const { postId } = req.params

        const token = req.headers.authorization

        const { userId } = jwt.decode(token)

        const post = await postModel.findOne({ _id: postId })
        const user = await userModel.findOne({ _id: userId })


        if (post.file) {

            fs.unlink(`uploads/posts/${post.file}`, async (err) => {
                if (err) {

                    console.log(err);
                } else {
                    await postModel.findByIdAndDelete({ _id: postId })

                    user.posts = user.posts.filter(oldpost => oldpost != postId)

                    user.save()

                    return resp.json({
                        status: "success",
                        msg: "one post deleted"
                    })

                }

            })

        } else {
            await postModel.findByIdAndDelete({ _id: postId })
            user.posts = user.posts.filter(oldpost => oldpost != postId)
            user.save()
            return resp.json({
                status: "success",
                msg: "one post deleted"
            })
        }

    } catch (e) {


    }


})




module.exports = router
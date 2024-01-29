const express = require('express')
const router = express.Router()
const postModel = require('../../models/PostModel')
const userModel = require('../../models/UserModel')

const jwt = require('jsonwebtoken')

router.get('/', async (req, resp) => {

    try {


        const token = req.headers.authorization
        if (token) {
            const { userId } = jwt.decode(token)
            const { folowing, posts: myPosts } = await userModel.findOne({ _id: userId })

            const posts = await postModel.find({}).populate('user').populate(['retwitte'])



            const copyPosts = JSON.parse(JSON.stringify(posts))

            const userPosts = copyPosts.filter(post =>
                folowing.includes(post.user._id) || myPosts.includes(post._id)
            )

            const result = userPosts.map(async newpost => {
                if (newpost.retwitte) {
                    const isMine = myPosts.includes(newpost._id)

                    const user = await userModel.findOne({ _id: newpost.retwitte.user })
                    return {
                        ...newpost,
                        isMine,
                        retwitte: {
                            ...newpost.retwitte,
                            user
                        }

                    }
                } else {

                    const isMine = myPosts.includes(newpost._id)

                    return {
                        ...newpost,
                        isMine,
                    }
                }


            })

            Promise.all(result).then(res => {

                return resp.json(res)
            })


        } else {

            const allposts = await postModel.find({}).populate('user').populate(['retwitte'])

            const copyallposts = JSON.parse(JSON.stringify(allposts))


            const result = copyallposts.map(async newpost => {
                if (newpost.retwitte) {

                    const user = await userModel.findOne({ _id: newpost.retwitte.user })
                    return {
                        ...newpost,
                        retwitte: {
                            ...newpost.retwitte,
                            user
                        }

                    }
                } else {

                    return newpost
                }


            })

            Promise.all(result).then(res => {

                return resp.json(res)
            })



        }




    } catch (e) {
        console.log(e);
    }




})


module.exports = router
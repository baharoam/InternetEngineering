const express = require('express')
const router = express.Router()
const postModel = require('../../models/PostModel')



router.get('/', async (req, resp) => {

    console.log(req.query);
    const { search } = req.query
    const posts = await postModel.find({})

    let result = []

    posts.forEach(post => {
        if (post.hashtags.length) {

            post.hashtags.forEach(hashtag => {

                if (hashtag.startsWith(search)) {

                    result.push(post)

                }

            })
        }
    })

    return resp.json(result)



})







module.exports = router
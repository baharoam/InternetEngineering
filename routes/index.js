const express = require('express')
const router = express.Router()
const checkToken = require('../middlewares/checkToken')


//auth
const signupRoute = require('./auth/signup')
router.use('/api/signup', signupRoute)
const loginRoute = require('./auth/login')
router.use('/api/login', loginRoute)

//user
const getUser = require('./user/getUser')
router.use('/api/user', getUser)
const getUsers = require('./user/getUsers')
router.use('/api/users', getUsers)
const getUserByusername = require('./user/getusersSerch')
router.use('/api/user-search', getUserByusername)


//profile
const uploadProfile = require('./profile/upload')
router.use('/api/profile', uploadProfile)
const getProfile = require('./profile/getProfile')
router.use('/profile', getProfile)

//folow unfolow
const folows = require('./folowing/folow')
router.use('/folow', checkToken, folows)
const unfolows = require('./folowing/unfolow')
router.use('/unfolow', checkToken, unfolows)


//post
const uploadPost = require('./post/upload')
router.use('/api/post', uploadPost)
const getPost = require('./post/getPost')
router.use('/post', getPost)

const getPosts = require('./post/getPosts')
router.use('/api/posts', getPosts)

const deletePost = require('./post/deletePost')
router.use('/api/post', deletePost)

const getpostByHash = require('./post/getPostsByHash')
router.use('/api/hash-posts', getpostByHash)



module.exports = router
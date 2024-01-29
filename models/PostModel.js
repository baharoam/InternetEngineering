const mongoose = require('mongoose')
const PostSchema = new mongoose.Schema({

    text: { type: String, default: null },
    hashtags: [{ type: String, default: null }],
    file: { type: String, default: null },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] },
    retwitte: { type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] },

}, { timestamps: true })


const Post = mongoose.model('Post', PostSchema);
module.exports = Post
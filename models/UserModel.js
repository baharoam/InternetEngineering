const mongoose = require('mongoose')
const UserSchema = new mongoose.Schema({

    email: { type: String, default: null },
    password: { type: String, default: null },
    username: { type: String, default: null },
    profile: { type: String, default: null },
    folowing: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    folowers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", default: [] }],
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post", default: [] }]

}, { timestamps: true })


const User = mongoose.model('User', UserSchema);
module.exports = User
const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
    }
})

const User = new mongoose.model("User", UserSchema)
User.createIndexes()
module.exports = User;
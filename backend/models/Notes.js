const mongoose = require("mongoose")


const NoteSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    notes:{
        type: String,
        required:true
    },
    date:{
        type: String,
    }
})

const Notes = new mongoose.model("Notes",NoteSchema)
module.exports = Notes
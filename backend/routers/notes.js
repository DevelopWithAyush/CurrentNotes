const express = require('express');
const Notes = require('../models/Notes'); // Assuming the file name is 'Notes.js'
const fetchuser = require('../middleware/fetchUser'); // Uncomment if needed
const router = express.Router();

const dates= new Date()
let date = dates.getDate()
let month = dates.getMonth()
let year = dates.getFullYear()
let time = `${date}/${month+1}/${year}`
// getting all notes 
router.get("/fetchallnotes",fetchuser,async(req,res)=>{
    try {
        const notes = await Notes.find({user:req.user.id})
        res.json(notes)
    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server problem")
    }
})

// adding a new notes

router.post('/addnotes',fetchuser, async (req, res) => {
    const { notes } = req.body;
    try {
        if (!notes) {
            return res.status(400).json({ error: 'Notes are required' });
        }

        const note = new Notes({ notes,user:req.user.id ,date:time});
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internal Server Error');
    }
});



router.delete("/delete/:id",fetchuser,async(req,res)=>{
try {
    let note = await Notes.findById(req.params.id);
    if(!note){
        return res.status(404).send("page not found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(404).send("page not found")
    }
    note = await Notes.findByIdAndDelete(req.params.id)
res.json({"Success": "notes has been deleted"})
} catch (error) {
    console.error(error.message)
    res.status(500).send("internal server problem in delete")
}
})


// updating the notes 
router.put("/update/:id",fetchuser,async(req,res)=>{
    const {notes} = req.body
    try {
        const newNotes ={}
        if(notes){newNotes.notes = notes}
        let note = await Notes.findById(req.params.id);
        if(!note){
            return res.status(404).send("page not found")
        }
        if(note.user.toString() !== req.user.id ){
            return res.status(404).send("page not found")
        }
    
        note = await Notes.findByIdAndUpdate(req.params.id,{$set:newNotes},{new:true})
        res.json({note})
    } catch (error) {
        res.status(500).send("some internal error update wala ")
    }
    })

module.exports = router;
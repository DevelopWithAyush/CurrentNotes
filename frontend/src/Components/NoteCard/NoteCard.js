import React, { useContext } from 'react'
import "./NoteCard.css"
import noteContext from '../../Context/noteContext';
function NoteCard(props) {



    const context = useContext(noteContext)
    let {notes,setshowmodal,updateNotes} = props;
    const {deleteNotes} = context

    const handledelete = ()=>{
        deleteNotes(notes._id)

    }
    const openit = ()=>{
        setshowmodal(true)
        updateNotes(notes)
        document.body.style.overflowY = "hidden"
    }
   


    return (
        <>

        <div className='notecard'>
            <div className="content">
                <p>date: {notes.date} </p>
                <div className="btn">
                    <i class="fa-solid fa-trash" onClick={handledelete} ></i>
                    <i class="fa-solid fa-pen-to-square" onClick={openit}></i>
                </div>
            </div>
            <p className='notes'>{notes.notes}</p>






        </div>
        </>
    )
}

export default NoteCard

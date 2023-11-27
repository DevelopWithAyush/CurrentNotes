import React, { useEffect, useState } from 'react'
import NoteCard from '../NoteCard/NoteCard'
import "./Notes.css"
import { useContext } from 'react'
import noteContext from "../../Context/noteContext"
import AddNotes from '../AddNotes/AddNotes'
import { useNavigate } from 'react-router-dom'
import "../UpdateNotes/UpdateNotes.css"


function Notes() {
  const navigate = useNavigate()
  const context = useContext(noteContext)
  const {notes, getNotes,editNotes } = context
  const [note,setNote] = useState({id:"",enotes:""})

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes()
    }
    else {

      navigate("/login")
    }
    // eslint-disable-next-line 
  })

  const updateNotes =(currentnotes)=>{
    setNote({id: currentnotes._id , enotes: currentnotes.notes})
  }

  const onchange =(e)=>{
    setNote({...note, [e.target.name]: e.target.value})
  }

  const handleupdatenotes = (e)=>{
    e.preventDefault()
    editNotes(note.id,note.enotes)
    setshowmodal(false)
    getNotes()

  
  }
  // update notes code start here 
  



  const [showmodal, setshowmodal] = useState(false)
const closeit =()=>{
  setshowmodal(false)
  document.body.style.overflowY = "scroll"
}






  return (<>


   {showmodal &&  <div className="updatenote" >
      <div className="wapper" onClick={closeit}></div>
      <div className="updatenotes"  >
        <h1 className="updateheading">UpdateNotes</h1>
        <form className="btn" onSubmit={handleupdatenotes}>
          <input type="text" name='enotes' placeholder='update your notes here' className='updateinput' onChange={onchange} value={note.enotes} />
          <button type='submit' onClick={handleupdatenotes} > update notes</button>
        </form>
        <button onClick={closeit} className='closebtn'> close it</button>


      </div>
    </div>}



    <div className="addnotesbox">
      <AddNotes />

      <h1 style={{ color: "#bf00ff", fontSize: "3rem", textDecoration: "underline" }} >your notes</h1>
    </div>
    <div className="notebox">
      {notes.length <= 0 ? <h1 style={{ fontSize: "1.5rem", fontWeight: "600", color: "gray" }}>no notes! kindly add notes to see </h1> : <>{notes.map((notes) => {
        return <NoteCard notes={notes} key={notes._id} setshowmodal = {setshowmodal} updateNotes = {updateNotes}  />
      })}</>
      }



    </div>
  </>
  )
}

export default Notes

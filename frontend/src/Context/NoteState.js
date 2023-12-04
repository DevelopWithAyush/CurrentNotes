import React, { useState } from 'react'
import NoteContext from "../Context/noteContext"

function NoteState(props) {
  const {showalert} = props

  const host = `http://localhost:8000`
  const [notes,setNotes] = useState([])
// getallnotes 

const getNotes = async()=>{
    try {
        const response = await fetch(`${host}/api/notes/fetchallnotes`,{
            method: 'GET',
            headers:{
                'Content_Type':'application/json',
                'authtoken':localStorage.getItem('token')
            },
        })
        const json = await response.json()
        console.log(json)
        setNotes(json)

    } catch (error) {
      showalert("error","internal server problem")
    }
}

// adding a new notes 
const addNotes = async (newNote) => {
    try {
      const response = await fetch(`${host}/api/notes/addnotes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'authtoken': localStorage.getItem('token')
        },
        body: JSON.stringify({ notes: newNote }), // Assuming 'notes' is the correct property
      });
      if (response.ok) {
        // Assuming 'notes' is the current state variable for your notes array
        const updatedNotes = [...notes, { notes: newNote }];
        setNotes(updatedNotes);
        showalert("success","Note added")

      } else {
        // Handle the error based on the response status or response.json() if needed
        console.error('Failed to add note:', response.status, response.statusText);
        // You might want to show a user-friendly error message or log the error accordingly
        showalert("error","some error try next time")

        
      }
    } catch (error) {
      showalert("error","internal server problem")
    }
  };
  

// deleting the notes 

const deleteNotes = async (id) => {
    try {
        const response = await fetch(`${host}/api/notes/delete/${id}`,{
            method: 'DELETE',
            headers:{
                'Content-Type':'application/json',
                'authtoken': localStorage.getItem('token')
            },
        })
        const json = await response.json()
        console.log(json)

    // Assuming 'notes' is the current state variable for your notes array
    const updatedNotes = notes.filter((note) => note._id !== id);
    setNotes(updatedNotes);
    showalert("success","Note deleted")

} catch (error) {
  showalert("errror","internal server error")

}
  };

const editNotes = async(id,note)=>{

try{
  const response = await fetch(`${host}/api/notes/update/${id}`,{
    method:'PUT',
    headers:{
      'Content-Type':'application/json',
      'authtoken':localStorage.getItem('token')
    },
    body:JSON.stringify({notes:note})
  });
  const json = response.json();
  console.log(json)

  let newNotes = JSON.parse(JSON.stringify((notes)))
  for(let index = 0; index< newNotes.length; index++){
    const element = newNotes[index]
    if(element._id === id){
      newNotes[index].notes = note;

      break;
    }
  }
  showalert("success","note updated")

  setNotes(newNotes)
}catch{
  showalert("error","internal server problem")


}





}




  return (
<NoteContext.Provider value={{notes,addNotes,deleteNotes,getNotes,editNotes}} >
    {props.children}
</NoteContext.Provider>
  )
}

export default NoteState

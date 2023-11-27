import React, { useContext } from 'react'
import Notes from '../Notes/Notes'
import noteContext from '../../Context/noteContext'
function Home() {

  const context = useContext(noteContext)
  const {notes} = context
  const numberofnotes = notes.length
  const title = `Currentnotes- ${localStorage.getItem('name')}(${numberofnotes})`
  document.title = title
  window.addEventListener('blur',()=>{
    document.title ="Welcome Back"
  })
  window.addEventListener('focus',()=>{
    document.title = title
  })
  return (
   <>
   <Notes/>
   </>
  )
}

export default Home

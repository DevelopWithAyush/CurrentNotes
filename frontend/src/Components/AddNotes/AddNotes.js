import React, { useState, useContext } from 'react';
import "./AddNotes.css";
import noteContext from '../../Context/noteContext';

function AddNotes() {
  const context = useContext(noteContext);
  const { addNotes,getNotes } = context;

  const [note, setNote] = useState({ notes: "" });

  const handleChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  const handleClick = (e) => {
    e.preventDefault();
    addNotes(note.notes);
    setNote({ notes: "" });
    getNotes()
  };

  return (
    <form className='addnotes' onSubmit={handleClick}>
      <input
        type="text"
        value={note.notes}
        onChange={handleChange}
        name='notes'
        placeholder='Enter your notes here'
      />
      <button type='submit' className='btn' onClick={handleClick}>
        Add Notes
      </button>
    </form>
  );
}

export default AddNotes;

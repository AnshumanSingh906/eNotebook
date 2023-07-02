import React, { useEffect, useState } from "react";
import { createContext } from "react";

export const NoteContext = createContext();

const Notestate = ({ children }) => {
  const host = "http://localhost:3002";
  const [notes, setNotes] = useState([]);

  // useEffect(() => {
  //     getNotes();
  //   }, []);
  const getNotes = async () => {
    // api call
    // console.log("saved token in localStorage",localStorage.getItem("token"));
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem("token")
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  const addNote = async (title, description,tag) => {
    // api call
        // console.log("saved token in localStorage",localStorage.getItem("token"));

    const response = await fetch(`http://localhost:3002/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem("token")

      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    console.log(note);
    setNotes(notes.concat(note));
  };

  const deleteNote = async (id) => {
    // API Call
    // console.log("saved token in localStorage",localStorage.getItem("token"));

    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem("token")
      },
    });
    const json = response.json();
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  const editNote = async (id, title, description, tag) => {
    // Api call
    // console.log("saved token in localStorage",localStorage.getItem("token"));

    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "authToken":localStorage.getItem("token")
      },
      body: JSON.stringify({ title, description, tag }),
    });

   
    console.log(" response from edit note or update note ", response)
     // const json = response.json();
    let newNotes= JSON.parse(JSON.stringify(notes));
    // logic to edit in client side
    for (let i = 0; i < newNotes.length; i++) {
      const e = newNotes[i];
      if (e._id === id) {
        newNotes[i].title = title;
        newNotes[i].description = description;
        newNotes[i].tag = tag;
    break;
      }
    }
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, editNote, setNotes, addNote, getNotes, deleteNote }}
    >
      {children}
    </NoteContext.Provider>
  );
};

export default Notestate;

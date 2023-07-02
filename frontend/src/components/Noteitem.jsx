import React, { useState } from 'react'
import { useContext } from 'react';
import {NoteContext} from "../context/Notestate"

export default function Noteitem(props) {

    const context = useContext(NoteContext);
    const {deleteNote, editnote} = context;
    const { note, updateNote, showAlert } = props;


    
    return (
        <div  className='col-lg-4'>
            <div className="card w-auto my-1">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title col">{note.title}</h5>
                        <button onClick={()=>{deleteNote(note._id);}}><i className={`fa-solid fa-trash`} ></i></button>
                        <button onClick={()=>updateNote(note)}><i className="fa-solid fa-pen-to-square"></i></button></div>
                        <br />
                    <div className='description' >{note.description}</div>
                </div>
            </div>
        </div>
    )
}

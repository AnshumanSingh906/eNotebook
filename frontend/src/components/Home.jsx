import React from 'react'
import Notes from './Notes.js'
import Addnote from './Addnote.jsx'

export default function Home(props) {
  // console.log("Home ",props.showAlert);
  return (
    <>
      <Addnote/>
      <Notes showAlert={props.showAlert}/>
    </>
  )
}

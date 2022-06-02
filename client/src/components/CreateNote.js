import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import "../styles/CreateNote/CreateNote.css";
export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  let today = new Date();
  // https://notation-backend.herokuapp.com/
  // http://localhost:3001
  const addNote = () => {
    Axios.post("http://localhost:3001/addNote", {
      date: date,
      title: title,
      description: description,
    });
  };

  return (
    <div className="CreateNote">
      <h1>
        What's on your <span className="green">mind</span> today?
      </h1>
      <div className="form-container">
        <form>
          <label>Title</label>
          <input
            className="title"
            type="text"
            placeholder="Title"
            onChange={(e) => {
              setTitle(e.target.value);
              setDate(
                String(today.getMonth() + 1).padStart(2, "0") +
                  "." +
                  String(today.getDate()).padStart(2, "0") +
                  "." +
                  today.getFullYear()
              );
            }}
          />
          <label>Note</label>
          <textarea
            className="note"
            width="50"
            height="50"
            placeholder="Note..."
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
          <button className="submit-btn" onClick={addNote}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

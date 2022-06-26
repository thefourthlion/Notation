import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import AuthService from "../services/auth.service";

import "../styles/CreateNote/CreateNote.css";
export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  let today = new Date();
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  // https://notation-backend.herokuapp.com/
  // http://localhost:3001
  const addNote = () => {
    if (currentUser) {
      Axios.post("https://notation.herokuapp.com/api/posts/post", {
        username: currentUser.username,
        userID: currentUser.id,
        date: date,
        title: title,
        description: description,
      });
    }
  };

  const isUserSignedIn = currentUser ? (
    <div>
      <h1 className="create-note-title">
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
          <button type="submit" className="green-outline-btn" onClick={addNote}>
            Submit
          </button>
        </form>
      </div>
    </div>
  ) : (
    <div className="user-not-signed-in">
      <h1>In order to create notes you must be signed in.</h1>
      <a href="https://notation-frontend.netlify.app/signin">
        <button type="button" className="solid-green-btn">
          Sign In
        </button>
      </a>
    </div>
  );

  return <div className="CreateNote">{isUserSignedIn}</div>;
}

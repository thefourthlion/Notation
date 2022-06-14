import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import "../styles/ReadNote/ReadNote.css";
import AuthService from "../services/auth.service";
import { useParams } from "react-router-dom";

import { UserContext } from "../contexts/UserContext";
export default function ReadNote() {
  // https://notation-backend.herokuapp.com/
  // http://localhost:3001
  const [noteList, setNoteList] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const { id } = useParams();
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      Axios.get(`http://localhost:3001/api/posts/read/${id}`).then((res) => {
        const data = res.data;
        setNoteList(data);
      });
    }
  }, []);

  const deleteNote = (id) => {
    Axios.delete(`http://localhost:3001/api/posts/delete/${id}`, {});
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  // const userName = currentUser.username;
  return (
    <div>
      <div className="ReadNote">
        {noteList.map((val, key) => {
          return (
            <div className="note-content" id={key}>
              <Container>
                <Row>
                  <Col>
                    <p className="date"></p>
                    <h1 className={val.key}>
                      <span className="green">{val.title}</span>
                    </h1>
                    <h2>-{val.username}</h2>
                    <h4>{val.description}</h4>
                    <button
                      className="delete-btn"
                      onClick={() => {
                        deleteNote(val._id);
                      }}
                    >
                      Delete Note
                    </button>
                  </Col>
                </Row>
              </Container>
            </div>
          );
        })}
      </div>
    </div>
  );
}

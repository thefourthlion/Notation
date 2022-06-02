import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import "../styles/ReadNote/ReadNote.css";
import { UserContext } from "../contexts/UserContext";
export default function ReadNote() {
  // https://notation-backend.herokuapp.com/
  // http://localhost:3001
  const [noteList, setNoteList] = useState([]);
  // const [currentUser, setCurrentUser] = useContext(UserContext);

  // const logUser = () => {
  //   console.log(currentUser);
  // };

  useEffect(() => {
    Axios.get("http://localhost:3001/readNote").then((res) => {
      setNoteList(res.data);
    });
  }, []);

  const deleteNote = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`, {});
    setTimeout(() => {
      // window.location.reload();
    }, 1000);
  };

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
                      <span className="green">{val.title}</span> - {val.date}
                    </h1>
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
              {/* <button className="delete-btn" onClick={logUser}>
                Log
              </button> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}

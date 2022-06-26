import react, { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import "../styles/NavBar/NavBar.css";

export default function NavBar() {
  const [showLinks, setShowLinks] = useState(false);

  const [currentUser, setCurrentUser] = useState(undefined);
  let noteLink = "";
  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
    window.location.reload();
  };

  const isUserSignedIn = currentUser ? (
    <a className="logout-a" href="http://localhost:3000/signin">
      <button
        type="button"
        className="user-btn green-outline-btn"
        onClick={logOut}
      >
        Log Out
      </button>
    </a>
  ) : (
    <a href="http://localhost:3000/signin">
      <button type="button" className="user-btn green-outline-btn sign-in">
        Sign In
      </button>
    </a>
  );
  if (currentUser) {
    console.log(currentUser);
    noteLink = "http://localhost:3000/readNote/" + currentUser.username;
  } else {
    noteLink = "http://localhost:3000/readNote";
  }
  // https://notation-frontend.netlify.app/
  // http://localhost:3000
  return (
    <div className="NavBar">
      <ul className="nav-links" id={showLinks ? "nav-active" : "nav-hidden"}>
        <li className="title">
          <a href="http://localhost:3000">
            <span className="green">Notation</span>
          </a>
        </li>
        <li>
          <a href="http://localhost:3000/add">Create Note</a>
        </li>
        <li>
          <a href={noteLink}>Read Notes</a>
        </li>
        <li>{isUserSignedIn}</li>
      </ul>
      <h1 className="nav-title bold-header">
        <span className="green">Notation</span>
      </h1>
      <div className="burger" onClick={() => setShowLinks(!showLinks)}>
        <div className="line1"></div>
        <div className="line2"></div>
        <div className="line3"></div>
      </div>
    </div>
  );
}

import react, { useState } from "react";
import "../styles/NavBar/NavBar.css";

export default function NavBar() {
  const [showLinks, setShowLinks] = useState(false);

  // const authenticate = isAuthenticated ? <LogoutButton /> : <LoginButton />;

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
          <a href="http://localhost:3000/add">Add Note</a>
        </li>
        <li>
          <a href="http://localhost:3000/readNote">View Notes</a>
        </li>
        <li>
          <a href="http://localhost:3000/signin">Sign In</a>
        </li>
        {/* <li className="nav-links">
          <a href="">
            <LoginButton />
          </a>
        </li> */}
        {/* {authenticate} */}
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

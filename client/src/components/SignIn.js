import "../styles/SignIn/SignIn.css";
import { useState, useContext, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AuthService from "../services/auth.service";

// ------------------------------------------ (end of imports)--------------------------------------

export default function SignIn() {
  // user input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userValidation, setUserValidation] = useState("");
  const [sendRequest, setSendRequest] = useState(false);
  // ------------------------------------------ (end of init)--------------------------------------

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === "" && password === "") {
      setUserValidation("Username and Password required");
    } else if (password === "") {
      setUserValidation("Password required");
    } else if (username === "") {
      setUserValidation("Username required");
    } else {
      try {
        await AuthService.login(username, password).then(
          (response) => {
            console.log("Logged in successfully", response);
            window.location.reload();
          },
          (error) => {
            console.log(error);
            setUserValidation("Email and Password combination do not match.");
          }
        );
      } catch (err) {
        console.log(err);
        setUserValidation("Error - Try again later.");
      }
    }
  };

  function loguser() {
    alert("Your signed in as " + currentUser.username);
  }
  // ------------------------------------------ (end of functions)--------------------------------------

  return (
    <div className="SignInPage">
      <form>
        <FloatingLabel className="form-input" label="Username">
          <Form.Control
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </FloatingLabel>

        <FloatingLabel className="form-input" label="Password">
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FloatingLabel>
        <h4 className="red">{userValidation}</h4>
        <p>
          Don't have an account{" "}
          <a className="link" href="http://localhost:3000/signup">
            Sign Up
          </a>
        </p>
        <button
          type="button"
          className="green-outline-btn"
          onClick={handleLogin}
        >
          Sign In
        </button>
        <button type="button" className="delete-btn" onClick={loguser}>
          Log
        </button>
      </form>
    </div>
  );
}

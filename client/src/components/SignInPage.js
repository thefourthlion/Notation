import "../styles/SignIn/SignIn.css";
import { useState, useContext, useEffect } from "react";

import AuthService from "../services/auth.service";

// ------------------------------------------ (end of imports)--------------------------------------

export default function SignInPage() {
  // user input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // ------------------------------------------ (end of init)--------------------------------------

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await AuthService.signup(
        firstName,
        lastName,
        username,
        email,
        phoneNumber,
        password
      ).then(
        (response) => {
          // check for token and user already exists with 200
          console.log("Signed up successfully", response);
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await AuthService.login(username, password).then(
        (response) => {
          console.log("Logged in successfully", response);
          window.location.reload();
        },
        (error) => {
          console.log(error);
        }
      );
    } catch (err) {
      console.log(err);
    }
  };

  const logOut = () => {
    AuthService.logout();
    window.location.reload();
  };

  // ------------------------------------------ (end of functions)--------------------------------------

  function loguser() {
    console.log(currentUser);
  }
  return (
    <div className="SignInPage">
      <form>
        <input
          id="username"
          type="text"
          placeholder="Username *"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        />
        <input
          id="firstName"
          type="text"
          placeholder="First Name *"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        />
        <input
          id="lastName"
          type="text"
          placeholder="Last Name *"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        />

        <input
          type="email"
          placeholder="Email *"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Password *"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Retype Password *"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
        <input
          type="text"
          placeholder="+1(209)123-4567 (optional)"
          onChange={(e) => {
            setPhoneNumber(e.target.value);
          }}
        />
        <button type="button" className="submit-btn" onClick={handleSignup}>
          Create Account
        </button>
        <button type="button" className="submit-btn" onClick={handleLogin}>
          Sign In
        </button>
        <button type="button" className="submit-btn" onClick={logOut}>
          Log Out
        </button>
        <button type="button" className="delete-btn" onClick={loguser}>
          Log
        </button>
        <p></p>
      </form>
    </div>
  );
}

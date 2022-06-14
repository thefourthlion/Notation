import "../styles/SignIn/SignIn.css";
import { useState, useContext, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import AuthService from "../services/auth.service";

// ------------------------------------------ (end of imports)--------------------------------------

export default function SignUp() {
  // user input
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [userValidation, setUserValidation] = useState("");
  //   const [inputVerifyList, setInputVerifyList] = useState([
  //     firstName,
  //     lastName,
  //     username,
  //     email,
  //     password,
  //     phoneNumber,
  //     retypePassword,
  //   ]);

  let emptyInputCount = 0;
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
    // for (let i in inputVerifyList) {
    //   if (inputVerifyList[i] === "") {
    //     console.log(inputVerifyList[i]);
    //     emptyInputCount++;
    //     console.log("empty");
    //   }
    // }
    // if (emptyInputCount > 2) {
    //   setUserValidation("Input required");
    //   emptyInputCount = 0;
    // } else

    // user validation
    if (username === "") {
      setUserValidation("Username required");
    } else if (username.length >= 16) {
      setUserValidation("Username too long");
    } else if (firstName === "") {
      setUserValidation("First Name required");
    } else if (lastName === "") {
      setUserValidation("Last Name required");
    } else if (email === "") {
      setUserValidation("Email required");
    } else if (!email.includes("@") || !email.includes(".")) {
      setUserValidation("Email must be valid");
    } else if (password === "") {
      setUserValidation("Password required");
    } else if (password.length < 8) {
      setUserValidation("Password too short");
    } else if (retypePassword === "") {
      setUserValidation("Retype Password required");
    } else if (password != retypePassword) {
      setUserValidation("Passwords required to match");
    } else if (phoneNumber != "") {
      if (!isNumeric(phoneNumber)) {
        setUserValidation("Phone number not valid");
      } else if (phoneNumber.length < 10 || phoneNumber.length > 11) {
        setUserValidation("Phone number not valid");
      }
    }

    // ------------------------------------------ (end of user validation)--------------------------------------
    else {
      try {
        setUserValidation("");
        await AuthService.signup(
          username,
          firstName,
          lastName,
          email,
          phoneNumber,
          password
        ).then(
          (response) => {
            // check for token and user already exists with 200
            console.log("Signed up successfully", response);
            // window.location.reload();
          },
          (error) => {
            console.log(error);
          }
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  function loguser() {
    alert("Your signed in as " + currentUser.username);
  }

  function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }
  // ------------------------------------------ (end of functions)--------------------------------------

  return (
    <div className="SignInPage">
      <form>
        <FloatingLabel className="form-input" label="Username *">
          <Form.Control
            placeholder="Username *"
            id="username"
            type="text"
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </FloatingLabel>

        <FloatingLabel className="form-input" label="First Name *">
          <Form.Control
            id="firstName"
            type="text"
            placeholder="First Name *"
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel className="form-input" label="Last Name *">
          <Form.Control
            id="lastName"
            type="text"
            placeholder="Last Name *"
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel className="form-input" label="Email *">
          <Form.Control
            type="email"
            placeholder="Email *"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel className="form-input" label="Password *">
          <Form.Control
            type="password"
            placeholder="Password *"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel className="form-input" label="Retype Password *">
          <Form.Control
            type="password"
            placeholder="Retype Password *"
            onChange={(e) => {
              setRetypePassword(e.target.value);
            }}
          />
        </FloatingLabel>
        <FloatingLabel
          className="form-input"
          label="+1(209)123-4567 (optional)"
        >
          <Form.Control
            type="text"
            maxLength="11"
            placeholder="+1(209)123-4567 (optional)"
            onChange={(e) => {
              setPhoneNumber(e.target.value);
            }}
          />
        </FloatingLabel>
        <h4 className="red">{userValidation}</h4>
        <p>
          Have an account already{" "}
          <a className="link" href="http://localhost:3000/signin">
            Sign In
          </a>
        </p>
        <button type="button" className="submit-btn" onClick={handleSignup}>
          Create Account
        </button>
        <button type="button" className="delete-btn" onClick={loguser}>
          Log
        </button>
        <p></p>
      </form>
    </div>
  );
}

import CreateNote from "./components/CreateNote";
import NavBar from "./components/NavBar";
import Home from "./components/Home";
import ReadNote from "./components/ReadNote";
import SignInPage from "./components/SignInPage";
import { UserContext } from "./contexts/UserContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useMemo, useEffect } from "react";

import AuthService from "./services/auth.service";

import "../src/styles/Main/Main.css";

export default function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const value = useMemo(
    () => ({ currentUser, setCurrentUser }),
    [currentUser, setCurrentUser]
  );

  return (
    <Router>
      <UserContext.Provider value={value}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<CreateNote />} />
          <Route path="/readNote" element={<ReadNote />} />
          <Route path="/signIn" element={<SignInPage />} />
        </Routes>
      </UserContext.Provider>
    </Router>
  );
}

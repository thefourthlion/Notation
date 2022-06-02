import "../styles/Home/Home.css";
import { useState, useEffect, useContext } from "react";
import AuthService from "../services/auth.service";

export default function Home() {
  return (
    <div className="Home">
      <div>
        <h1>
          Welcome to <span className="green">Notation</span>, notes that
          simplify life.
        </h1>
        <a href="http://localhost:3000/add">
          <button className="get-started-btn">Get Started</button>
        </a>
      </div>
    </div>
  );
}

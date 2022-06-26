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
        <a href="https://notation-frontend.netlify.app/add">
          <button className="solid-green-btn">Get Started</button>
        </a>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function registerUser(e) {
    e.preventDefault();
    axios.post("/register", { name, email, password });
    setName("");
    setEmail("");
    setPassword("");
  }
  return (
    <div className="login-register-container">
      <form
        className="flex flex-col items-center py-8 gap-4"
        onSubmit={registerUser}
      >
        <div className="login-title text-2xl">New User? Please Register.</div>
        <input
          className="border shadow rounded-lg text-xl pl-1 pb-1 pr-8"
          type="text"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border shadow rounded-lg text-xl pl-1 pb-1 pr-8"
          type="text"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="border shadow rounded-lg text-xl pl-1 pb-1 pr-8"
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="text-white bg-violet-600 text-xl px-4 pb-1 rounded-2xl shadow">
          Register
        </button>
        <div className="goto-register">
          Already a member?{" "}
          <Link className="underline" to="/login">
            Login here
          </Link>
        </div>
      </form>
    </div>
  );
}

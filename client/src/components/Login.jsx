import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../UserContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { setUser } = useContext(UserContext);
  async function loginUser(e) {
    e.preventDefault();
    const resp = await axios.post(
      "/login",
      {
        email,
        password,
      },
      { withCredentials: true }
    );
    setUser(resp.data.userDoc);
    if (resp.data.loggedIn) {
      setRedirect(true);
    }
    setEmail("");
    setPassword("");
  }
  if (redirect) {
    return <Navigate to={"/"} />;
  }
  return (
    <div className="login-register-container">
      <form
        className="flex flex-col items-center py-8 gap-4"
        onSubmit={loginUser}
      >
        <div className="login-title text-2xl">Welcome back! Please Login.</div>
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
        <button className="text-white bg-violet-600 hover:bg-violet-500 text-xl px-4 pb-1 rounded-2xl shadow">
          Login
        </button>
        <div className="goto-register">
          Don't have an account?{" "}
          <Link className="underline" to="/register">
            Register now
          </Link>
        </div>
      </form>
    </div>
  );
}

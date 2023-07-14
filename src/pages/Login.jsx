import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      console.log("Error occured ", err);
      setErr(true);
    }
  };

  return (
    <div className="formContainer bg-background h-screen flex items-center justify-center">
      <div className="formWrapper bg-white py-5 px-16 flex flex-col items-center gap-3 rounded-xl">
        <span className="logo text-dark font-bold text-2xl">Chatster</span>
        <span className="title text-dark text-xs">Login</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="email"
            className="px-4 py-2 border-b border-b-light text-light w-64 focus:outline-none placeholder:text-secondary"
          />
          <input
            type="password"
            placeholder="password"
            className="px-4 py-2 border-b border-b-light text-light w-64 focus:outline-none placeholder:text-secondary"
          />
          <button type="submit" className="bg-primary text-white p-2 font-bold">
            Login
          </button>
          {err && (
            <p className="text-center text-red-500">Something went wrong</p>
          )}
        </form>
        <p className="text-dark text-xs mt-2">
          Don't have an account ? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

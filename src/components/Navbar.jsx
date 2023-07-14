import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="navbar flex items-center bg-darkest h-12 p-2.5 justify-between text-lighter">
      <span className="logo font-bold">Chatster</span>
      <div className="user flex gap-2.5">
        <img
          src={currentUser.photoURL}
          alt=""
          className="w-6 h-6 bg-lighter rounded-full bg-cover"
        />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => signOut(auth)}
          className="px-1 bg-dark text-lighter text-xxs rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;

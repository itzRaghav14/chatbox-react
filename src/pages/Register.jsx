import React, { useState } from "react";
import addAvatar from "../assets/images/addAvatar.png";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import defaultAvatar from "../assets/images/defaultAvatar.png";

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    let file = e.target[3].files[0];

    try {
      //Create user
      const res = await createUserWithEmailAndPassword(auth, email, password);

      //Create a unique image name
      const date = new Date().getTime();
      const storageRef = ref(storage, `${displayName + date}`);

      await uploadBytesResumable(storageRef, file).then(() => {
        getDownloadURL(storageRef).then(async (downloadURL) => {
          if(!file) downloadURL = 'https://cdn-icons-png.flaticon.com/128/847/847969.png'
          try {
            //Update profile
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //create user on firestore
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            //create empty user chats on firestore
            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          } catch (err) {
            console.log(err.message);
            setErr(true);
            setLoading(false);
          }
        });
      });
    } catch (err) {
      setErr(true);
      setLoading(false);
      console.log(err.message);
    }
  };

  return (
    <div className="formContainer bg-background h-screen flex items-center justify-center">
      <div className="formWrapper bg-white py-5 px-16 flex flex-col items-center gap-3 rounded-xl">
        <span className="logo text-dark font-bold text-2xl">Chatster</span>
        <span className="title text-dark text-xs">Register</span>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="display name"
            className="px-4 py-2 border-b border-b-light text-light w-64 focus:outline-none placeholder:text-secondary"
          />
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
          <input
            type="file"
            id="file"
            className="hidden px-4 py-2 border-b border-b-light text-light w-64 focus:outline-none placeholder:text-secondary"
          />
          <label
            htmlFor="file"
            className="px-4 py-2 text-xs text-light w-64 flex gap-2 items-center cursor-pointer"
          >
            <img src={addAvatar} alt="add-avatar" className="w-4 h-4" />
            <p>Upload File</p>
          </label>
          <button type="submit" className="bg-primary text-white p-2 font-bold">
            Sign Up
          </button>
          {err && (
            <p className="text-center text-red-500">Something went wrong {err}</p>
          )}
        </form>
        <p className="text-dark text-xs mt-2">
          Already have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

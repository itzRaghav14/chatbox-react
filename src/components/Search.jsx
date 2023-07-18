import React, { useContext, useState } from "react";
import UserChat from "./UserChat";
import { db } from "../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState();
  const [err, setErr] = useState("");

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", username)
    );

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
        console.log(doc.data());
      });
    } catch (err) {
      console.log(err.message);
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.key === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    //check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        //create user chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUser(null);
    setUsername("")
  };

  return (
    <div className="search border-b border-secondary">
      <div className="searchForm p-2.5">
        <input
          type="text"
          value={username}
          placeholder="Find a user..."
          onChange={(e) => setUsername(e.target.value)}
          onKeyDown={handleKey}
          className="bg-transparent text-white text-sm outline-none placeholder:text-secondary"
        />
      </div>
      {err && (
        <p className="text-secondary pb-2 px-4 text-sm">User not found</p>
      )}
      {user && (
        <UserChat
          onClick={handleSelect}
          name={user.displayName}
          imgUrl={user.photoURL}
        />
      )}
    </div>
  );
};

export default Search;

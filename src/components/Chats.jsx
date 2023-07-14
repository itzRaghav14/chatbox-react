import React, { useContext, useEffect, useState } from "react";
import UserChat from "./UserChat";
import { db } from "../firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (u) => {
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  return (
    <div className="chats">
      {Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].data)
        .map((chat) => (
          <UserChat
            key={chat[0]}
            name={chat[1].userInfo.displayName}
            imgUrl={chat[1].userInfo.photoURL}
            message={chat[1].userInfo.lastMessage?.text}
            onClick={() => handleSelect(chat[1].userInfo)}
          />
        ))}
    </div>
  );
};

export default Chats;

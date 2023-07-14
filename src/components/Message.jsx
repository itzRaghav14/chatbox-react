import React, { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import defaultAvatar from '../assets/images/defaultAvatar.png'

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const owner = message.senderId === currentUser.uid;
  const msgDir = owner ? "flex-row-reverse" : "";
  const msgStyle = owner
    ? "bg-primaryLight text-white rounded-tr-none"
    : "bg-white rounded-tl-none";
  const contentDir = owner ? "items-end" : "";
  let imgUrl = owner ? currentUser.imgUrl : data.user.imgUrl;

  if (!imgUrl) {
    imgUrl = defaultAvatar;
  }

  imgUrl = 'https://cdn-icons-png.flaticon.com/128/847/847969.png'

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message]);

  console.log(message);

  return (
    <div ref={ref} className={`message flex gap-2 mb-5 ${msgDir}`}>
      <div className="messageInfo flex flex-col font-light text-gray-700">
        <img
          src={imgUrl}
          alt="pfp"
          className="h-8 w-8 rounded-full bg-cover"
        />
        <span>just now</span>
      </div>
      <div
        className={`messageContent max-w-[80%] flex flex-col gap-2.5 ${contentDir}`}
      >
        <p className={`p-2.5 rounded-xl max-w-max ${msgStyle}`}>
          {message.text}
        </p>
        {message.img && <img src={message.img} alt="msg-img" className="w-1/2" />}
      </div>
    </div>
  );
};

export default Message;

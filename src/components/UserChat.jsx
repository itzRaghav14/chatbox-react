import React from "react";

const UserChat = ({name, imgUrl, message, onClick}) => {
  return (
    <div onClick={onClick} className="userChat p-2.5 flex items-center gap-2.5 text-white cursor-pointer hover:bg-darkest">
      <img src={imgUrl} alt="pfp" className="h-12 w-12 rounded-full bg-cover" />
      <div className="userChatInfo overflow-hidden">
        <span className="text-lg font-semibold capitalize">{name}</span>
        <p className="text-sm text-secondary truncate">{message}</p>
      </div>
    </div>
  );
};

export default UserChat;

import React, { useContext, useEffect } from 'react'
import camera from '../assets/images/camera.png'
import addFriend from '../assets/images/addFriend.png'
import more from '../assets/images/more.png'
import Messages from './Messages'
import Input from './Input'
import { ChatContext } from '../context/ChatContext'

const Chat = () => {

  const {data} = useContext(ChatContext)

  console.log(data);

  return (
    <div className='chat flex-2 flex flex-col'>
      <div className='chatInfo h-12 bg-dark flex items-center justify-between p-2.5 text-secondary'>
        <span>{data.user?.displayName}</span>
        <div className="chatIcons flex gap-4">
          <img src={camera} alt="" className='h-4 cursor-pointer' />
          <img src={addFriend} alt="" className='h-4 cursor-pointer' />
          <img src={more} alt="" className='h-4 cursor-pointer' />
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  )
}

export default Chat

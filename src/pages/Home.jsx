import React from 'react'
import Sidebar from '../components/Sidebar'
import Chat from '../components/Chat'

const Home = () => {
  return (
    <div className='home h-screen bg-background flex justify-center items-center'>
      <div className='containerClass w-2/3 h-4/5 border border-white rounded-xl flex overflow-hidden'>
        <Sidebar />
        <Chat />
      </div>
    </div>
  )
}

export default Home

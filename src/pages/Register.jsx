import React from 'react'
import addAvatar from '../assets/images/addAvatar.png'

const Register = () => {
  return (
    <div className='formContainer bg-background h-screen flex items-center justify-center'>
      <div className='formWrapper bg-white py-5 px-16 flex flex-col items-center gap-3 rounded-xl'>
        <span className='logo text-dark font-bold text-2xl'>Chatster</span>
        <span className='title text-dark text-xs'>Register</span>
        <form action="" className='flex flex-col gap-4'>
          <input type="text" placeholder='display name' className='px-4 py-2 border-b border-b-light text-light w-64 focus:outline-none placeholder:text-secondary' />
          <input type="email" placeholder='email' className='px-4 py-2 border-b border-b-light text-light w-64 focus:outline-none placeholder:text-secondary' />
          <input type="password" placeholder='password' className='px-4 py-2 border-b border-b-light text-light w-64 focus:outline-none placeholder:text-secondary' />
          <input type="file" id="file" className='hidden px-4 py-2 border-b border-b-light text-light w-64 focus:outline-none placeholder:text-secondary' />
          <label htmlFor="file" className='px-4 py-2 text-xs text-light w-64 flex gap-2 items-center cursor-pointer'>
            <img src={addAvatar} alt="add-avatar" className='w-4 h-4' />
            <p>Upload File</p>
          </label>
          <button type="submit" className='bg-primary text-white p-2 font-bold'>Sign Up</button>
        </form>
        <p className='text-dark text-xs mt-2'>Already have an account ? Login</p>
      </div>
    </div>
  )
}

export default Register

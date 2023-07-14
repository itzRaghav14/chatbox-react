import React from 'react'

const Login = () => {
  return (
    <div className='formContainer bg-background h-screen flex items-center justify-center'>
      <div className='formWrapper bg-white py-5 px-16 flex flex-col items-center gap-3 rounded-xl'>
        <span className='logo text-dark font-bold text-2xl'>Chatster</span>
        <span className='title text-dark text-xs'>Login</span>
        <form action="" className='flex flex-col gap-4'>
          <input type="email" placeholder='email' className='px-4 py-2 border-b border-b-light text-light w-64 focus:outline-none placeholder:text-secondary' />
          <input type="password" placeholder='password' className='px-4 py-2 border-b border-b-light text-light w-64 focus:outline-none placeholder:text-secondary' />
          <button type="submit" className='bg-primary text-white p-2 font-bold'>Login</button>
        </form>
        <p className='text-dark text-xs mt-2'>Don't have an account ? Register</p>
      </div>
    </div>
  )
}

export default Login

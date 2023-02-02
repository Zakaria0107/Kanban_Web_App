import React from 'react'

export default function SignUp(props) {
  return (
    <div className='box'>
        <div className='flex justify-between items-center mb-8'>
            <h3 className='text-white font-bold text-xl'>Create Account</h3>
        </div>
        <div className='mt-4'> 
            <label className='label'>Email</label>
            <input type="email" className='field' />
        </div>
        <div className='mt-4'> 
            <label className='label'>Password </label>
            <input type="password" className='field' />
        </div>
        <div className='mt-4'> 
            <label className='label'>Password repeat </label>
            <input type="password" className='field' />
        </div>
        <button type='button' className=' actions_btns text-white bg-[#635fc7] mt-12'>Sign Up</button>
        <button className='text-white underline mt-8' onClick={() => props.switchForm()}>Already have Account</button>
    </div>
  )
}

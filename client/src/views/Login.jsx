import React, { useState } from 'react'
import SignIn from '../components/SignIn'
import SignUp from '../components/SignUp'

export default function Login() {
    const [signInform  , setSignInForm]= useState(true)
    const [signUpform  , setSignUpForm]= useState(false)

    const switchForm = () => {
        setSignInForm(!signInform)
        setSignUpForm(!signUpform)
    }
  return (
    <div className='w-[100%] h-[100vh] bg-[#20212C] flex justify-center items-center'>
        
        {
            signInform && <SignIn switchForm={switchForm} />
            
        }
        {
            signUpform && <SignUp switchForm={switchForm} />
        }
    </div>
  )
}

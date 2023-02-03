import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function SignUp(props) {
    const nav = useNavigate()
    const [name , setName] = useState("")
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [passwordRep , setPasswordRep] = useState("")

    const signUp = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/user/signUp` , {
            name: name , 
            email : email , 
            password : password , 
            passwordRep , passwordRep
        })
        .then(res => {
            nav("/")
        })
        .catch(err => Swal.fire(err.response.data.error))
    }
  return (
    <div className='box'>
        <div className='flex justify-between items-center mb-8'>
            <h3 className='text-white font-bold text-xl'>Create Account</h3>
        </div>
        <div className='mt-4'> 
            <label className='label'>Name</label>
            <input type="name" className='field'  value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div className='mt-4'> 
            <label className='label'>Email</label>
            <input type="email" className='field'  value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mt-4'> 
            <label className='label'>Password </label>
            <input type="password" className='field' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='mt-4'> 
            <label className='label'>Password repeat </label>
            <input type="password" className='field' value={passwordRep} onChange={(e) => setPasswordRep(e.target.value)}/>
        </div>
        <button type='button' className=' actions_btns text-white bg-[#635fc7] mt-12' onClick={() => signUp()}>Sign Up</button>
        <button className='text-white underline mt-8' onClick={() => props.switchForm()}>Already have Account</button>
    </div>
  )
}

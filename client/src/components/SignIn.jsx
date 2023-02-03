import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

export default function SignIn(props) {
    const nav = useNavigate()
    const [email , setEmail ] = useState("")
    const [password , setPassword] = useState("")

    const signIn = () => {
        axios.post(`${process.env.REACT_APP_API_URL}/user/signIn`, {
            email : email , 
            password : password
        })
        .then(res => {
            localStorage.setItem("token" , res.data.token)
            localStorage.setItem("id" , res.data._id)
            nav("/")
        })
        .catch(err => Swal.fire(err.response.data.error))
    }
  return (
    <div className='box'>
        <div className='flex justify-between items-center mb-8'>
            <h3 className='text-white font-bold text-xl'>Sign In</h3>
        </div>
        <div className='mt-4'> 
            <label className='label'>Email</label>
            <input type="email" className='field' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className='mt-4'> 
            <label className='label'>Password </label>
            <input type="password" className='field' value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type='button' className=' actions_btns text-white bg-[#635fc7] mt-12' onClick={() => signIn()}>Sign In</button>
        <button className='text-white underline mt-8' onClick={() => props.switchForm()}>Create Account</button>
    </div>
  )
}

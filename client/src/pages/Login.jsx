import React from 'react'
import LoginForm from '../components/LoginForm'

export default function Login({updateUser}) {
  return (
    <LoginForm updateUser={updateUser}/>
  )
}

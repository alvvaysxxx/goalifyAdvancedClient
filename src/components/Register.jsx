import React, { useState, useEffect } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'

import axios from 'axios'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function Register(props) {

  const navigate = useNavigate()

  let [username, setUsername] = useState(undefined)
  let [password, setPassword] = useState(undefined)
  let [verifyPassword, setVerifyPassword] = useState(undefined)
  let [verifyError, setVerifyError] = useState(false)
  let [anyErrors, setAnyErrors] = useState(false)

  useEffect(() => {
    if (verifyPassword !== password) {
      setVerifyError(true)
      return
    }
    setVerifyError(false)
  }, [verifyPassword, password])

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleVerifyPassword = (e) => {
    setVerifyPassword(e.target.value)
  }
  

  const handleSign =  async () => {
    try {
      const response = await axios.post('https://shy-ruby-lamb-belt.cyclic.app/sign', {
        username,
        password
      })
      const loginResponse = await axios.post('https://shy-ruby-lamb-belt.cyclic.app/login', {
        username,
        password
      })
      props.setToken(loginResponse.data.token)
      props.saveToken(loginResponse.data.token)
      navigate('/')
    } catch (err) {
      console.log(err)
      setAnyErrors(err.response.data.message)
    }
  }


  return (
    <div>
      <div className = 'form'>
        <Typography variant = 'h6' style = {{ textAlign: 'center', marginBottom: '25px' }}>Регистрация</Typography>
        <form>
          <TextField label ='Имя пользователя' name = 'username' style = {{ display: 'block', marginBottom: '15px' }} fullWidth onChange = {handleUsername}></TextField>
          <TextField type = 'password' label ='Пароль' name = 'password' style = {{ display: 'block', marginBottom: '10px' }} fullWidth  onChange = {handlePassword}></TextField>
          <TextField label ='Подтвердите пароль' name = 'password' style = {{ display: 'block', marginBottom: '20px' }} fullWidth  onChange = {handleVerifyPassword}></TextField>
          {verifyError ? (<Typography variant = 'body1' style = {{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>Пароли не совпадают</Typography>) : (<></>)}
          {anyErrors ? (<Typography variant = 'body1' style = {{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{anyErrors}</Typography>) : (<></>)}
          {username && password && verifyPassword ? (<Button variant='contained' onClick = {handleSign}>Зарегистрироваться</Button>): (<Button variant='contained' disabled onClick = {handleSign}>Зарегистрироваться</Button>)}
        </form>
      </div>
    </div>
  )
}

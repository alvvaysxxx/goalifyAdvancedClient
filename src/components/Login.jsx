import React, { useState } from 'react'
import { Button, TextField, Typography } from '@mui/material'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


export default function Login(props) {

  const navigate = useNavigate()

  let [username, setUsername] = useState(undefined)
  let [password, setPassword] = useState(undefined)
  let [error, setError] = useState(undefined)

  const handleUsername = (e) => {
    setUsername(e.target.value)
  }

  const handlePassword = (e) => {
    setPassword(e.target.value)
  }

  const handleLogin =  async () => {
    try {
      const response = await axios.post('https://shy-ruby-lamb-belt.cyclic.app/login', {
        username,
        password
      })
      props.setToken(response.data.token)
      props.saveToken(response.data.token)
      navigate('/')
    } catch (err) {
      console.log(err)
      setError(err.response.data.message)
    }
  }

  return (
    <div>
      <div className = 'form'>
        <Typography variant = 'h6' style = {{ textAlign: 'center', marginBottom: '25px' }}>Войдите в свой аккаунт</Typography>
        <form>
          <TextField label ='Имя пользователя' name = 'username' style = {{ display: 'block', marginBottom: '10px' }} fullWidth onChange = {handleUsername}></TextField>
          <TextField label ='Пароль' name = 'password' style = {{ display: 'block', marginBottom: '20px' }} fullWidth  onChange = {handlePassword}></TextField>
          {error ? (<Typography variant = 'body1' style = {{ color: 'red', textAlign: 'center', marginBottom: '20px' }}>{error}</Typography>) : (<></>)}
          {username && password ? (<Button variant='contained' onClick = {handleLogin}>Логин</Button>): (<Button variant='contained' disabled onClick = {handleLogin}>Логин</Button>)}
        </form>
      </div>
    </div>
  )
}

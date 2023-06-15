import React, { useState } from 'react'
import { TextField, Button, Typography, Switch } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function NewGoal({token}) {

  const navigate = useNavigate()

  let [title, setTitle] = useState(undefined)
  let [desc, setDesc] = useState(undefined)
  let [isImportant, setIsImportant] = useState(false)

  const handleTitle = (e) => {
    setTitle(e.target.value)
  }

  const handleDesc = (e) => {
    setDesc(e.target.value)
  }

  const handleForm = async () => {
    try {
      const response = await axios.post('https://shy-ruby-lamb-belt.cyclic.app/newgoal', {
        title,
        desc,
        important: isImportant
      }, {
        headers: {
          Authorization: token
        }
      })
      console.log(response)
    } catch (err) { 
      console.log(err)
    } finally {
      navigate('/')
    }
  }

  return (
    <div className = 'newGoal'>
      <ArrowBackIcon onClick = {() => navigate(-1)} sx = {{ mb: '15px' }}/>
      <Typography variant = 'h6' sx = {{ textAlign: 'center', mb: '25px' }}>Новая цель</Typography>
      <form>
        <TextField required label = 'Заголовок цели' fullWidth onChange = {handleTitle} />
        <TextField required label = 'Описание цели' fullWidth onChange = {handleDesc} />
        <Switch onChange={() => setIsImportant(!isImportant)}/><Typography variant = 'p'>Важно</Typography>
      </form>
      {title && desc ? (<Button variant = 'contained' onClick = {handleForm}>Создать</Button>) : (<Button variant = 'contained' disabled>Создать</Button>)}
    </div>
  )
}

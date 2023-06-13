import React from 'react'
import {Button} from '@mui/material'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <div className = 'welcome'>
      <Link to = '/login'><Button variant = 'contained' style = {{ marginRight: '10px' }}>Вход</Button></Link>
      <Link to = 'sign'><Button variant = 'contained' style = {{ marginLeft: '10px' }}>Регистрация</Button></Link>
    </div>
  )
}

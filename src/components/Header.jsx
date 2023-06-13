import React, {useState} from 'react'
import { Avatar, Button, Dialog, DialogContent, DialogActions, DialogContentText, DialogTitle } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import {Link} from 'react-router-dom'

export default function Header(props) {

  const navigate = useNavigate()
  let [open, setOpen] = useState(false)

  const logout = () => {
    localStorage.clear()
    props.setToken(undefined)
    navigate('/')
  }

  return (
    <div className = 'header'>
      <Link to = "/newgoal"><Button variant = 'contained' className = 'newgoal' style = {{ marginLeft: '20px' }}>Новая цель</Button></Link>
      <Avatar className = 'account' onClick = {() => setOpen(true)}></Avatar>
      <Dialog
        open = {open}
        onClose = {() => setOpen(false)}
      >
        <DialogTitle>{props.username}</DialogTitle>
        <DialogActions>
          <Button onClick = {logout}>Выйти из аккаунта</Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

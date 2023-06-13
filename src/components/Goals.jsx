import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Button } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import DoneIcon from '@mui/icons-material/Done';
import Header from './Header';
import Skeleton from '@mui/material/Skeleton';

export default function Goals({ token, setToken }) {
  const [goals, setGoals] = useState(undefined)
  const [username, setUsername] = useState(undefined)
  const [changeCount, setChangeCount] = useState(0)

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get('https://shy-ruby-lamb-belt.cyclic.app/goals', {
        headers: {
          Authorization: token,
        }
      })
      setGoals(response.data.goals)
      console.log(response.data.goals)
    }
    async function getusername() {
      const response = await axios.get('https://shy-ruby-lamb-belt.cyclic.app/username', {
        headers: {
          Authorization: token
        }
      })
      setUsername(response.data)
    }
    fetchData()
    getusername()
  }, [changeCount])

  const setImportant = async (id) => {
    try {
      const response = await axios.post('https://shy-ruby-lamb-belt.cyclic.app/updategoal', {
        important: true,
        id
      })
      setChangeCount(changeCount + 1)
    } catch (err) {
      console.log(err);
    }
  }

  const removeImportant = async (id) => {
    try {
      const response = await axios.post('https://shy-ruby-lamb-belt.cyclic.app/updategoal', {
        important: false,
        id
      })
      setChangeCount(changeCount + 1)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteGoal = async (id) => {
    try {
      const response = await axios.post('https://shy-ruby-lamb-belt.cyclic.app/deletegoal', {
        id
      })
      setChangeCount(changeCount + 1)
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div>
      <Header username = {username} setToken = {setToken}/>
      {goals ? (
        goals.map((goal, key) =>
          goal.important ? (
            <Card variant="outlined" key={key} sx={{ maxWidth: 500, marginBottom: '10px' }}>
              <CardContent>
                <Typography variant="subtitle2" color="orangered" style={{ opacity: '0.5' }}>
                  Помечено как "важное"
                </Typography>
                <Typography variant="h5" color="orange">
                  {goal.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {goal.desc}
                </Typography>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography variant="overline">ДЕЙСТВИЯ</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="actionsImportant">
                      <Button variant="outlined" color="error" onClick={() => removeImportant(goal._id)}>
                        <GradeIcon />
                        <Typography variant="button" color="error">
                          Убрать отметку "важно"
                        </Typography>
                      </Button>
                      <Button variant="outlined" color="error" onClick = {() => deleteGoal(goal._id)}>
                        <GradeIcon />
                        <Typography variant="button" color="error">
                          Удалить цель
                        </Typography>
                      </Button>
                      <Button variant="contained" color="success">
                        <DoneIcon />
                        <Typography variant="button">Отметить как "выполненное"</Typography>
                      </Button>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          ) : null
        )
      ) : null}
      {goals ? (
        goals.map((goal, key) =>
          !goal.important ? (
            <Card variant="outlined" key={key} sx={{ maxWidth: 500, marginBottom: '10px' }}>
              <CardContent>
                <Typography variant="h5">{goal.title}</Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {goal.desc}
                </Typography>

                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography variant="overline">ДЕЙСТВИЯ</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="actions">
                      <Button variant="outlined" onClick={() => setImportant(goal._id)}>
                        <GradeIcon />
                        <Typography variant="button">
                          Установить отметку "важно"
                        </Typography>
                      </Button>
                      <Button variant="outlined" color="error"  onClick = {() => deleteGoal(goal._id)}>
                        <GradeIcon />
                        <Typography variant="button" color="error">
                          Удалить цель
                        </Typography>
                      </Button>
                      <Button variant="contained" color="success">
                        <DoneIcon />
                        <Typography variant="button">Отметить как "выполненное"</Typography>
                      </Button>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </Card>
          ) : null
        )
      ) : (<><Skeleton animation="wave" variant="rectangular" width={500} height={200} sx = {{ mb: '10px' }} /><Skeleton animation="wave" variant="rectangular" width={500} height={200}/></>)}
    </div>
  )
}

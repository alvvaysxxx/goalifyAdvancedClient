import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Welcome from './components/Welcome';
import Goals from './components/Goals';
import Login from './components/Login'
import Register from './components/Register'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewGoal from './components/NewGoal';

function App() {

  let [token, setToken] = useState(localStorage.getItem('token'))
  
  function saveToken (token) {
    localStorage.setItem('token', token)
  }


  if (!token) {
    return(
      <div>
        <BrowserRouter>
          <Routes>
            <Route path = '/' element = {<Welcome/>} />
            <Route path = '/login' element = {<Login setToken = {setToken} saveToken = {saveToken}/>} />
            <Route path = '/sign' element = {<Register setToken = {setToken} saveToken = {saveToken}/>} />
          </Routes>
        </BrowserRouter>
      </div>
    )
  }

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path = '/' element = {<Goals token = {token} setToken = {setToken}/>} />
        <Route path ='/newgoal' element = {<NewGoal token = {token}/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

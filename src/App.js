import './App.css';
import { BrowserRouter as Router, Routes,Route, Link } from 'react-router-dom';
import Home from './Pages/Home';
import Login from './Pages/Login';
import CreatePosts from './Pages/CreatePosts';
import { useState } from 'react';
import { signOut} from 'firebase/auth'
import { Button } from 'react-bootstrap';
import {auth} from '../src/firebase-config'
function App() {
  
  const [isAuth,setIsAuth]= useState(localStorage.getItem("isAuth"));


const signUserOut =()=>{
  signOut(auth).then(()=>{
    localStorage.clear()
    setIsAuth(false)
    window.location.pathname="/login";
  })

}


  return (
   <Router>
    <nav>
      <Link className='navlink' to="/">Home</Link>
      
     {!isAuth ? (
     <Link className='navlink' to="/Login">Login</Link> 
     ):(
      <>
      <Link className='navlink' to="/createPosts">Create Post</Link>
     <Button onClick={signUserOut}>LogOut</Button>
     </>
     )}
    </nav>
    <Routes>
      <Route path='/' element={<Home  isAuth={isAuth}/>}/>
      <Route path='/createposts' element={<CreatePosts isAuth={isAuth}/>}/>
      <Route path='/login' element={<Login setIsAuth={setIsAuth}/>}/>

    </Routes>
   </Router>
  );
}

export default App;

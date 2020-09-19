import React, { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
import {createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializerLoginFramework, signInWithEmailAndPassword} from './LoginManager'



function Login() {
  const [newUser, setNewUser] = useState(false);
 const [user, setUser] = useState({
   isSignedIn: false,
   newUser: false,
   name: '', 
   email: '', 
   password:'',
   photo: '',
   error: '',
   success:false
 })

 initializerLoginFramework();

 const [loggedInUser, setLoggedInUser] = useContext(UserContext);
 const history = useHistory();
 const location = useLocation();
 const {from } = location.state || {from: {pathname:"/"}}

  const googleSignIn = () => {
      handleGoogleSignIn()
      .then (response =>{
          handleResponse(response, true);
        //   setUser(response);
        //   setLoggedInUser(response);
        //   history.replace(from);
      }) 

  }
  
  
  
  const fbSignIn = () => {
      handleFbSignIn()
      .then(response => {
          handleResponse(response, true);
        //   setUser(response);
        //   setLoggedInUser(response);
        //   history.replace(from);
      })
  }
  const signOut = () => {
    handleSignOut()
    .then(response => {
        handleResponse(response, false);
        // setUser(response);
        // setLoggedInUser(response);
    })
}
  
const handleResponse = (response, redirect) => {
    setUser(response);
    setLoggedInUser(response);
    if(redirect){
        history.replace(from);
    }
}

  const handleOnChange = (event) =>{
     //console.log(event.target.name,event.target.value);
     let isFormValid = true;
     if(event.target.name ==='email'){
        isFormValid = /\S+@\S+\.\S+/.test(event.target.value);
       //console.log(isEmailValid);
     }
     if(event.target.name === 'password'){
      const isPasswordValid = event.target.value.length>8;
      const passwordNumber = /\d{1}/.test(event.target.value);
      isFormValid = isPasswordValid && passwordNumber;
      //console.log(isPasswordValid && passwordNumber);
      
     }
     if(isFormValid){
        //[...cart , newItem] =
        const newUserInfo = {...user};
        newUserInfo[event.target.name] = event.target.value;
        setUser(newUserInfo);

     }
  }
  const handleOnSubmit = (event) => {
    console.log(user.email, user.password);
    if(newUser && user.email && user.password){
      createUserWithEmailAndPassword(user.name, user.email, user.password)
      .then(result => {
          handleResponse(result, true);
        //   setUser(result);
        //   setLoggedInUser(result);
        //   history.replace(from);
      })
    }
 if(!newUser && user.email && user.password){
  signInWithEmailAndPassword(user.email, user.password)
  .then(result => {
      handleResponse(result, true);
    //   setUser(result);
    //   setLoggedInUser(result);
    //   history.replace(from);
  })
}

    event.preventDefault();
  }

  
  return (
    <div style={{textAlign: 'center'}}>
      {
        user.isSignedIn ?  <button onClick={signOut}>Sign out!</button>:
        <button onClick={googleSignIn}>Sign in!</button>
      }
      <br/>
      <button onClick={fbSignIn}>Sign in using Facebook</button>
      {
        user.isSignedIn && <div>
          <p> Welcome, {user.name}</p>
          <p>Your Email: {user.email}</p>
          <img src={user.photo} alt=""></img>
        </div>
      }

      <h1> Out Own Authentication</h1>
      <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser">New User Sign up</label>
      {/* <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>password: {user.password}
      </p> */}
      <form action="" onSubmit={handleOnSubmit}>
        {newUser && <input onBlur={handleOnChange} name="name" placeholder="Your name"  type=""/>}
        <br />
      <input onBlur={handleOnChange} type="text" name= "email" placeholder="Enter yout email address" required></input>
      <br/>
      <input onBlur={handleOnChange} type="password" name="password" placeholder="Enter your password"id="" required></input>
      <br/>
      <input type="submit" value={newUser? 'Sign UP' : 'Sign In'}/>
        </form>
    <p style = {{color:'red'}}>{user.error}</p>
    {user.success && <p style = {{color:'blue'}}>User {newUser ?  'created' : 'logged In'} successfuly</p>}
    </div>
  );
}

export default Login;

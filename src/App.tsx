import * as React from 'react';
import './App.css';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PkceAuth from './Auth';
import User from './User';
import jwt_decode from "jwt-decode";
import { Identity } from './Types';

// Simple check to see if we have an authorization callback in the URL
let params = new URLSearchParams(window.location.search);
let auth_code = params.get("code");
if(auth_code) {
  console.log("Getting a token...");
  const url = window.location.href;
  PkceAuth.exchangeForAccessToken(url).then((resp: any) => {
    // If you get back multiple tokens you'll need to make changes here.
    const access_token = resp.access_token;
    const id_token = resp.id_token;

    // Set it in local storage - the are a number of alternatives for
    // saving this that are arguably more secure but this is the simplest
    // for demonstration purposes.
    window.localStorage.setItem("auth_token", access_token);
    window.localStorage.setItem("id_token", id_token);

    // This isn't strictly necessary but it ensures no code reuse.
    sessionStorage.removeItem('pkce_code_verifier');
    sessionStorage.removeItem('pkce_state');
    console.log('Cleared the PKCE state!');

    // Redirect back to the root URL (simple but brittle way to clear the query params)
    let url = window.location.href.split('?')[0];
    window.location.replace(url);
  });  
}

function loginWithGlobus(e: any) {
  let authUrl = PkceAuth.authorizeUrl();
  console.log(`Sending the user to ${authUrl}`);
  window.location.replace(PkceAuth.authorizeUrl());
}

function logout(e: any) {
  // Should revoke here
  window.localStorage.removeItem("auth_token");
  window.localStorage.removeItem("id_token");
  let url = window.location.href.split('?')[0];
  window.location.replace(url);
}

function App() {
  const auth_token = localStorage.getItem("auth_token");
  const raw_id_token = localStorage.getItem("id_token");
  const id_token : Identity|null = raw_id_token ? jwt_decode(raw_id_token) : null;

  // For reference purposes, example of using the auth token to request 
  // user info
  // if(auth_token) {
  //   console.log("Getting user information with token !");
  //   fetch("https://auth.globus.org/p/whoami?include=identity_provider", {
  //     headers: new Headers({
  //     "Authorization": `Bearer ${auth_token}`
  //     })
  //   }).then((response) => response.json())
  //   .then((responseData) => {
  //     console.log(responseData);
  //   })
  // } 

  return (
    <div className="App">
      <AppBar position='static'>
         <Toolbar>
           {/* Note it's probably better to check the validity of the token as
           well as its existence, please add an issue to the repo if this would 
           be useful. */}
           {!auth_token ? 
          <Button color="secondary" variant="contained" onClick={loginWithGlobus} startIcon={<AccountCircleIcon/>}>Login</Button> :
          <Button color="secondary" variant="contained" onClick={logout} startIcon={<AccountCircleIcon/>}>Logout</Button>
        }
        </Toolbar>
      </AppBar>
      <header className="App-header">  
        <div>
          <img src="globus_examples.png" className="App-logo" alt="logo" />
          <p>Globus Auth Javascript SPA Example</p>
        </div>
        {/* If we have an ID token, show the user information */}
        {id_token ? <User user={id_token}></User> : null}
      </header>
    </div>
  );
}

export default App;

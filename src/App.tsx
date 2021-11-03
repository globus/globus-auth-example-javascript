import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from '@material-ui/core';
import {AppBar, Toolbar, Typography, IconButton} from '@material-ui/core';
import PKCE from 'js-pkce';

// TODOs:
// 1. Switch from local storage to in-memory or cookie HTTP-only storage, e.g.: https://marmelab.com/blog/2020/07/02/manage-your-jwt-react-admin-authentication-in-memory.html
// 2. Fix the session for the PKCE library so we don't get code reuse errors.
//     - For the moment, clear the session storage key 'pkce-state'
// 3. Implement proper state management in React, but I'm trying to keep this short and minimal React for now.
// 4. Switch to the better library https://github.com/openid/AppAuth-JS


// Option 1: https://github.com/openid/AppAuth-JS
// TODO!

// Option 2: https://github.com/bpedroza/js-pkce
// sessionStorage.removeItem('pkce_state');
const pkce = new PKCE({
  client_id: 'a63334f4-df31-4a43-9396-14c2615b3391',
  redirect_uri: 'http://localhost:3000',
  authorization_endpoint: 'https://auth.globus.org/v2/oauth2/authorize',
  token_endpoint: 'https://auth.globus.org/v2/oauth2/token',
  requested_scopes: 'openid profile email',
});


// Simple check to see if we have an authorization callback in the URL
let params = new URLSearchParams(window.location.search);
let auth_code = params.get("code");
if(auth_code) {
  console.log("In the callback from a login!");
  
  console.log("Getting a token...");
  const url = window.location.href;
  pkce.exchangeForAccessToken(url).then((resp) => {
    const token = resp.access_token;
    console.log(`Aha token! Token = ${token}`);
    window.localStorage.setItem("auth", token);
    // inMemoryJWTManager.setToken(token);
    //Redirect back to the root URL (simple but brittle way to clear the query params)
   let url = window.location.href.split('?')[0];
   window.location.replace(url);
  });  
}

function loginWithGlobus(e: any) {
  let authUrl = pkce.authorizeUrl();
  console.log(`Sending them to ${authUrl}`);
  window.location.replace(pkce.authorizeUrl());
}

function logout(e: any) {
  window.localStorage.removeItem("auth");
  let url = window.location.href.split('?')[0];
  window.location.replace(url);
 // inMemoryJWTManager.ereaseToken();
}

function App() {  
  // console.log(inMemoryJWTManager.getToken());

  return (
    <div className="App">
      <AppBar position='static'>
         <Toolbar>
           {localStorage.getItem("auth") == undefined ? 
          <Button color="inherit" onClick={loginWithGlobus}>Login</Button> :
          <Button color="inherit" onClick={logout}>Logout</Button>
        }
        </Toolbar>
      </AppBar>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Globus Auth React Example!
        </p>
      </header>
    </div>
  );
}

export default App;

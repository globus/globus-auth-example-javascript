import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import {Button} from '@material-ui/core';
import {AppBar, Toolbar} from '@material-ui/core';
import PkceAuth from './Auth';
import * as Types from './Types';
import User from './User';

// TODOs:
// 1. Switch from local storage to in-memory or cookie HTTP-only storage, e.g.: https://marmelab.com/blog/2020/07/02/manage-your-jwt-react-admin-authentication-in-memory.html
// 2. Fix the session for the PKCE library so we don't get code reuse errors.
//     - For the moment, clear the session storage key 'pkce-state'
// 3. Implement proper state management in React, but I'm trying to keep this short and minimal React for now.
// 4. Switch to the better library https://github.com/openid/AppAuth-JS

// Simple check to see if we have an authorization callback in the URL
let params = new URLSearchParams(window.location.search);
let auth_code = params.get("code");
if(auth_code) {
  console.log("In the callback from a login!");
  
  console.log("Getting a token...");
  const url = window.location.href;
  PkceAuth.exchangeForAccessToken(url).then((resp: any) => {
    const token = resp.access_token;
    //Set it in local storage (not the most secure solution).
    window.localStorage.setItem("auth", token);

    // We shouldn't need to do this, but guarantees no code reuse.
    sessionStorage.removeItem('pkce_code_verifier');
    sessionStorage.removeItem('pkce_state');
    console.log('Cleared the PKCE state!');

    //Redirect back to the root URL (simple but brittle way to clear the query params)
    let url = window.location.href.split('?')[0];
    window.location.replace(url);
  });  
}

function loginWithGlobus(e: any) {
  let authUrl = PkceAuth.authorizeUrl();
  console.log(`Sending them to ${authUrl}`);
  window.location.replace(PkceAuth.authorizeUrl());
}

function logout(e: any) {
  window.localStorage.removeItem("auth");
  let url = window.location.href.split('?')[0];
  window.location.replace(url);
}

function App() {
  const [userinfo, setUserInfo] = useState<Types.IUserInfoResponse>();

  let authToken = localStorage.getItem("auth");

  // There are better ways to do this but keeping this a minimal example
  if(authToken && !userinfo) {
    console.log("Getting user information with token !");
    fetch("https://auth.globus.org/p/whoami?include=identity_provider", {
      headers: new Headers({
      "Authorization": `Bearer ${authToken}`
      })
    }).then((response) => response.json())
    .then((responseData) => {
      setUserInfo(responseData);
    })
  } 

  return (
    <div className="App">
      <AppBar position='static'>
         <Toolbar>
           {!authToken ? 
          <Button color="inherit" onClick={loginWithGlobus}>Login</Button> :
          <Button color="inherit" onClick={logout}>Logout</Button>
        }
        </Toolbar>
      </AppBar>
      <header className="App-header"> {!userinfo ? 
        <div>
          <img src={logo} className="App-logo" alt="logo" />
          <p>Globus Auth React Example!</p>
        </div> :
        <div>
          {userinfo.identities.map(user => (<User user={user}/>))}
        </div>
        }
      </header>
    </div>
  );
}

export default App;

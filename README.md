![Globus Examples](public/globus_examples.png)

# Globus Auth Example: A Javascript React SPA

This repo provides an example of integrating Globus Auth into a Javascript React Single Page Application (SPA). You can use this to integrate an auth layer into your application so that users can log in with any of the thousands of Globus-integrated identity providers. 

The example uses [`js-pkce`](https://www.npmjs.com/package/js-pkce) to do a PKCE flow for Globus Auth authentication and authorization. When the user is redirected back to the application from Globus Auth the token(s) are retrieved and you can use those to perform any actions you like.

## Installation and Starting

1. Install Node.JS and NPM
2. Run `npm install` to install packages
3. Update the Auth configuration to 
4. Run `npm start` to start the application

## Configuration

The application is configured in [Auth.js](src/Auth.js#L7-L13). Set your Globus Auth native client ID and other parameters here:
```js
const PkceAuth = new PKCE({
  client_id: 'a63334f4-df31-4a43-9396-14c2615b3391',  // Update this using your native client ID
  redirect_uri: 'http://localhost:3000',  // Update this if you are deploying this anywhere else (Globus Auth will redirect back here once you have logged in)
  authorization_endpoint: 'https://auth.globus.org/v2/oauth2/authorize',  // No changes needed
  token_endpoint: 'https://auth.globus.org/v2/oauth2/token',  // No changes needed
  requested_scopes: 'openid profile email',  // Update with any scopes you would need, e.g. transfer
});
```

To configure it for your own application:
1. Create a Globus Auth native client [here](auth.globus.org/developers)
  1. Set up any restrictions, such as required identity providers, during this step 
3. Update the client ID, your redirects, and any additional scopes your need [here](src/Auth.js#L7-L13)

## Questions and Support

Please feel to reach out with any support questions at [Globus Support](mailto:support@globus.org).

import PKCE from 'js-pkce';

// Option 1: https://github.com/openid/AppAuth-JS
// TODO!

// Option 2: https://github.com/bpedroza/js-pkce
const PkceAuth = new PKCE({
  client_id: 'a63334f4-df31-4a43-9396-14c2615b3391',
  redirect_uri: 'http://localhost:3000',
  authorization_endpoint: 'https://auth.globus.org/v2/oauth2/authorize',
  token_endpoint: 'https://auth.globus.org/v2/oauth2/token',
  requested_scopes: 'openid profile email',
});

export default PkceAuth;
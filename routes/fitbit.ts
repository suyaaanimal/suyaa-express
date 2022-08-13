import express from 'express';

const router = express.Router();
const { Fitbit, FileTokenManager } = require('fitbit-oauth2-client');
const appConfig = require('../config/fitbitConfig');

// Instanciate a fitbit client.  See example config below.
//
const fitbit = new Fitbit(
  appConfig.fitbit,
  new FileTokenManager(appConfig.fitbit.tokenFilePath),
);

// In a browser, http://localhost:4000/fitbit to authorize a user for the first time.
//
router.get('/fitbit', (req, res) => {
  res.redirect(fitbit.authorizeURL());
});

// Callback service parsing the authorization token and asking for the access token.  This
// endpoint is refered to in config.fitbit.authorization_uri.redirect_uri.  See example
// config below.
//
router.get('/fitbit_auth_callback', (req, res, next) => {
  const { code } = req.query;
  fitbit
    .fetchToken(code)
    .then((token: any) => {
      console.log('Token fetched and persisted: ', token);
      res.redirect('/fb-profile');
    })
    .catch((err: any) => {
      next(err);
    });
});

// Call an API.  fitbit.request() mimics nodejs request() library, automatically
// adding the required oauth2 headers.  The callback is a bit different, called
// with ( err, body, token ).  If token is non-null, this means a refresh has happened
// and you should persist the new token.
//
router.get('/fb-profile', (req, res, next) => {
  fitbit
    .request({
      uri: 'https://api.fitbit.com/1/user/-/profile.json',
      method: 'GET',
    })
    .then(() => {
      res.send(
        `<pre>${JSON.stringify(res, null)}</pre>`,
      );
    })
    .catch((err: any) => {
      next(err);
    });
});

export default router;

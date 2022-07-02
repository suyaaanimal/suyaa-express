const router = express.Router()
const appConfig = require( './config/appConfig' );
const {Fitbit, FileTokenManager} = require( 'fitbit-oauth2-client' );

// Instanciate a fitbit client.  See example config below.
//
var fitbit = new Fitbit( appConfig.fitbit, new FileTokenManager(appConfig.fitbit.tokenFilePath) );

// In a browser, http://localhost:4000/fitbit to authorize a user for the first time.
//
router.get('/fitbit', function (req, res) {
    res.redirect( fitbit.authorizeURL() );
});

// Callback service parsing the authorization token and asking for the access token.  This
// endpoint is refered to in config.fitbit.authorization_uri.redirect_uri.  See example
// config below.
//
router.get('/fitbit_auth_callback', function (req, res, next) {
    var code = req.query.code;
    fitbit.fetchToken(code).then(token => {
        LOGGER.debug("Token fetched and persisted: ", token);
        res.redirect( '/fb-profile' );
    }).catch(err => {
        next( err );
    });
});

// Call an API.  fitbit.request() mimics nodejs request() library, automatically
// adding the required oauth2 headers.  The callback is a bit different, called
// with ( err, body, token ).  If token is non-null, this means a refresh has happened
// and you should persist the new token.
//
router.get( '/fb-profile', function( req, res, next ) {
    fitbit.request({
        uri: "https://api.fitbit.com/1/user/-/profile.json",
        method: 'GET',
    }).then(response => {
        res.send( '<pre>' + JSON.stringify( response.data, null, JSON_INDENT ) + '</pre>' );
    }).catch(err => {
        next( err );
    });
});

module.exports = router
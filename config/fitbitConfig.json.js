require('dotenv').config();

module.exports = {
    "fitbit": {
        "timeout": 10000,
        "tokenExpiresFactorProcentage": 70,
        "creds": {
            "clientID": process.env.FITBIT_CLIENT_ID,
            "clientSecret": process.env.FITBIT_CLIENT_SECRET
        },
        "tokenFilePath": "./test/config/token-test.json",
        "uris": {
            "authorizationUri": "https://www.fitbit.com",
            "authorizationPath": "/oauth2/authorize",
            "tokenUri": "https://api.fitbit.com",
            "tokenPath": "/oauth2/token"
        },
        "authorization_uri": {
            "redirect_uri": process.env.FITBIT_REDIRECT_URL,
            "scope": "sleep",
            "state": "3(#0/!~"
        }
    }
};
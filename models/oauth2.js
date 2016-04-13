import mongoose from 'mongoose';
import {getUserOauth2} from './user';

mongoose.model('OAuthTokens', new mongoose.Schema({
  token: {type: String},
  expires: {type: Date},
  tokenType: {type: String},
  clientId: {type: String},
  userId: {type: String}
}));

mongoose.model('OAuthClients', new mongoose.Schema({
  clientId: {type: String},
  clientSecret: {type: String},
  redirectUris: {type: Array}
}));

let OAuthTokensModel = mongoose.model('OAuthTokens');
let OAuthClientsModel = mongoose.model('OAuthClients');

export let getAccessToken = (bearerToken, callback) => {
  console.log('in getAccessToken (bearerToken: ' + bearerToken + ')');
  OAuthTokensModel.findOne({token: bearerToken, tokenType: 'access'})
    .exec(function (err, token) {
      callback(err, token);
    });
};

export let getClient = (clientId, clientSecret, callback) => {
  OAuthClientsModel.findOne({clientId, clientSecret})
    .exec(function (err, client) {
      callback(err, client);
    });
};

export let grantTypeAllowed = (clientId, grantType, callback) => {
  //TODO:
  callback(null, true);
};

export let getRefreshToken = (refreshToken, callback) => {
  console.log('in getRefreshToken (refreshToken: ' + refreshToken + ')');
  OAuthTokensModel.findOne({token: refreshToken, tokenType: 'refresh'})
    .exec(function (err, token) {
      callback(err, token);
    });
};

export let saveRefreshToken = (token, client, expires, user, callback) => {
  console.log('in saveToken (token: ' + token + ')');
  let accessToken = new OAuthTokensModel({
    token,
    expires,
    clientId: client,
    tokenType: 'refresh',
    userId: user._id
  });

  accessToken.save((err, accessToken) => {
    callback(false, accessToken);
  });
};

/**
 * Save token.
 */

export let saveAccessToken = (token, client, expires, user, callback) => {
  console.log('in saveToken (token: ' + token + ')');
  let accessToken = new OAuthTokensModel({
    token,
    expires,
    clientId: client,
    tokenType: 'access',
    userId: user._id
  });

  accessToken.save((err, accessToken) => {
    callback(false, accessToken);
  });
};

export let getUser = getUserOauth2;

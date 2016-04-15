import oauthserver from 'oauth2-server';
import * as oauth2Model from './../models/oauth2';
import config from './../config/config';

export let oauth2 = oauthserver({
  model: oauth2Model,
  grants: config.get('oauth2Grants'),
  debug: false,
  passthroughErrors: true
});

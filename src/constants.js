const config = require("./config");

const constants = {
  urlPrefix: `${config.backendProtocol}://${config.backendHost}:${config.backendPort}`,
  appName: 'Ephemeral',
  lsTokenKey: 'ephemere_app_token',
  lsCookieKey: 'ephemere_cookie_accepted'
};

export default constants;
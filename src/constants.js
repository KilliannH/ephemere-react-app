const config = require("./config");

const constants = {
  urlPrefix: `${config.backendProtocol}://${config.backendHost}:${config.backendPort}`,
  appName: 'Ephemeral',
  lsTokenKey: 'ephemere_app_token'
};

export default constants;
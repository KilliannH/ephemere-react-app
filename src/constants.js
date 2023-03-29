const constants = {
  urlPrefix: `${process.env.REACT_APP_BACKEND_PROTOCOL}://${process.env.REACT_APP_BACKEND_HOST}`,
  appName: 'Ephemeral',
  lsTokenKey: 'ephemere_app_token',
  lsCookieKey: 'ephemere_cookie_accepted'
};

export default constants;
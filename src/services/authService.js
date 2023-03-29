import constants from "../constants";
const axios = require("axios").default;

const instance = axios.create({
    baseURL: constants.urlPrefix,
    timeout: 5000,
    // headers: {'X-Custom-Header': 'foobar'}
});



export function initFbConnection() {
    return new Promise((resolve, reject) => {
        window.fbAsyncInit = function () {
            // eslint-disable-next-line no-undef
            FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                xfbml: true,
                version: process.env.REACT_APP_FACEBOOK_API_VERSION
            });
            // eslint-disable-next-line no-undef
            FB.AppEvents.logPageView();
            console.log("fb sdk loaded");

            // eslint-disable-next-line no-undef
            FB.getLoginStatus(function (response) {
                resolve(response);
            });
        };

        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) { return; }
            js = d.createElement(s); js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    });
}

export function login(credentials) {
        return instance.post('/login', {
            email: credentials.email,
            password: credentials.password
        }).then(({ data }) => {
            console.log("result from be", data);
            localStorage.setItem(constants.lsTokenKey, data.token);
            return data;
        }).catch((e) => console.error(e));
}

export function logout() {
    const lsToken = localStorage.getItem(constants.lsTokenKey);
    if (!lsToken) {
        return Promise.resolve;
    }
    return new Promise((resolve, reject) => {
        localStorage.removeItem(constants.lsTokenKey);
        // eslint-disable-next-line no-undef
        FB.logout();
        this.userLoggedIn = null;
        resolve();
    });
}


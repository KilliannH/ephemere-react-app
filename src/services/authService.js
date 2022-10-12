import constants from "../constants";
import * as jose from "jose";
import * as simpleCrypto from "simple-crypto";
const axios = require("axios").default;
const config = require("../config");

const instance = axios.create({
    baseURL: `${config.backendProtocol}://${config.backendHost}:${config.backendPort}`,
    timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});



export function initFbConnection() {
    return new Promise((resolve, reject) => {
        window.fbAsyncInit = function () {
            // eslint-disable-next-line no-undef
            FB.init({
                appId: config.facebook.appId,
                cookie: true,
                xfbml: true,
                version: config.facebook.apiVersion
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

export function apiLogin(claims) {
    return new Promise((resolve, reject) => {
        _encodeToken(claims).then((encoded) => {
            console.log("encoded", encoded);
            return instance.post('/authenticate', { accessToken: encoded }).then(({ data }) => {
                console.log("result from be", data);
                localStorage.setItem(constants.lsTokenKey, data.token);
                const decoded = decodeToken();
                resolve(decoded);
            });
        }).catch((e) => reject(e));
    });
}

export function login() {
    return new Promise((resolve, reject) => {
        // eslint-disable-next-line no-undef
        FB.login();
        // eslint-disable-next-line no-undef
        FB.Event.subscribe('auth.authResponseChange', function (res) {
            if (res.status === "connected") {
                console.log("event received: user connected");

                // user accepted facebook connection
                return apiLogin({
                    sub: {
                        facebookId: res.authResponse.userID,
                        accessToken: res.authResponse.accessToken
                    },
                    issuer: constants.appName
                }).then((decoded) => {
                    return resolve(decoded)
                });
            } else {
                reject("User hasn't submited from FB Login API");
            }
        });

        // unsubscribe from events
        // eslint-disable-next-line no-undef
        FB.Event.unsubscribe('auth.statusChange', () => { });

    });
}

export function decodeToken() {
    const accessToken = localStorage.getItem(constants.lsTokenKey);
    if (!accessToken) {
        return Promise.reject("token not found");
    }
    const decoded = jose.decodeJwt(accessToken);
    return decoded;
}

async function _encodeToken(claims) {

    // facebookId is salted before sent
    const encoded = simpleCrypto.encrypt(claims.sub.facebookId, config.appSalts);
    claims.sub.facebookId = encoded;

    // key is encoded through Uint8Array
    const jwt = await new jose.SignJWT({ 'sub': JSON.stringify(claims.sub) })
        .setIssuer(claims.issuer)
        .setExpirationTime(Math.floor(Date.now() / 1000) + (60 * 60 * 72) /* 72h */)
        .setProtectedHeader({ alg: 'HS512' })
        .sign(new TextEncoder().encode(config.appSecret))
    return jwt;
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


import constants from "../constants";
import * as jose from "jose";
const axios = require("axios").default;
const config = require("../config");

const instance = axios.create({
    baseURL: constants.urlPrefix,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(constants.lsTokenKey)
    }
});

export function getUserByFacebookId(facebookId) {
    return instance.get('/api/users/facebookId/' + facebookId);
}
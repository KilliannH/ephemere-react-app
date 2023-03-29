import constants from "../constants";
import * as jose from "jose";
const axios = require("axios").default;

const instance = axios.create({
    baseURL: constants.urlPrefix,
    timeout: 2000,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem(constants.lsTokenKey)
    }
});

export function getUserById(userId) {
    return instance.get('/api/users/' + userId);
}
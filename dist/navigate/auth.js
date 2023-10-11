"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt_simple_1 = __importDefault(require("jwt-simple"));
const keys_1 = __importDefault(require("../config/keys"));
const userToken = (user) => {
    return jwt_simple_1.default.encode({
        sub: user.id,
        iat: Math.round(Date.now() / 1000),
        exp: Math.round(Date.now() / 1000 + 5 * 60 * 60)
    }, keys_1.default.secret);
};
exports.signin = (req, res, next) => {
    res.send({
        token: userToken(req.user),
        userID: req.user._id
    });
};
exports.currUser = (req, res) => {
    const user = {
        username: req.user.username,
        firstname: req.user.firstName,
        lastname: req.user.lastName,
        email: req.user.email,
        avatar: req.user.avatarURL,
        address: req.user.address,
        coord: req.user.coord,
        token: userToken(req.user)
    };
    res.send(user);
};
exports.default = exports;

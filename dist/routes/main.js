"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = void 0;
const express_1 = __importDefault(require("express"));
const passport_1 = __importDefault(require("passport"));
const auth_1 = __importDefault(require("../navigate/auth"));
const authRequirement = passport_1.default.authenticate('jwt', {
    session: false,
    failureRedirect: '/auth/unauth'
});
const signinNeeded = passport_1.default.authenticate('local', {
    session: false
});
var router = express_1.default.Router();
exports.default = router;
//===============================================
router.get("/auth/unauth", (req, res, next) => {
    res.status(401).send('Unauthorized');
});
router.post("/auth/signin", signinNeeded, auth_1.default.signin);
router.get("/auth/present_user", authRequirement, auth_1.default.currUser);
router.get("/auth/signout", (req, res) => {
    req.session.destroy(() => {
        return res.redirect("/auth/signin");
    });
    res.send("Logged Out.");
});

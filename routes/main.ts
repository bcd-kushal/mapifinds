import express from "express";
import passport from "passport";

import passService from "../auth/passport";
import auth from "../navigate/auth";

const authRequirement = passport.authenticate('jwt', {
    session: false,
    failureRedirect: '/auth/unauth' 
});

const signinNeeded = passport.authenticate('local', {
    session: false
})

var router = express.Router();

//===============================================

router.get("/auth/unauth", (req,res,next) => {
    res.status(401).send('Unauthorized');
});

router.post("/auth/signin", signinNeeded, auth.signin);

router.get("/auth/present_user", authRequirement, auth.currUser);

router.get("/auth/signout", (req,res) => {
    req.session.destroy(() => {
        return res.redirect("/auth/signin");
    });

    res.send("Logged Out.");
});

export { router as default };
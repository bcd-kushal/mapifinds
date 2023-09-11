
const checkValidityOfNewUser = (req) => {
    //check user exists in DB or not
    //create new user from ../model/users.js

    //user.pfp may or may not exist, so dont fetch it
    if (req.body.userName && req.body.firstName && req.body.lastName && req.body.emailID && req.body.passw && req.body.address && req.body.addressCoOrd)
        return true
    else
        return false
}

const checkValidityOfUserDetails = (req) => {
    if (req.body.firstName !== '' && req.body.lastName !== '' && req.body.address && req.body.addressCoOrd)
        return true
    else
        return false
}

module.exports = { checkValidityOfNewUser, checkValidityOfUserDetails }

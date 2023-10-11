import jwt from "jwt-simple";
import keys from "../config/keys";
import user from "../models/user"

const userToken = (user) => {
    return jwt.encode(
        {
            sub: user.id,
            iat: Math.round(Date.now()/1000),
            exp: Math.round(Date.now()/1000 + 5*60*60)
        },
        keys.secret
    );
};

exports.signin = (req: { user: { _id: any; }; },res: { send: (arg0: { token: string; userID: any; }) => void; },next: any) => {
    res.send({
        token: userToken(req.user),
        userID: req.user._id
    });
};

exports.currUser = (req: { user: { username: any; firstName: any; lastName: any; email: any; avatarURL: any; address: any; coord: any; }; },res: { send: (arg0: { username: any; firstname: any; lastname: any; email: any; avatar: any; address: any; coord: any; token: string; }) => void; }) => {
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

export default exports;
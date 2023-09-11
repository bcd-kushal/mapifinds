import { Schema as _Schema, model } from 'mongoose';
import { crypto } from 'crypto';
const Schema = _Schema;

const UserDB = new Schema({
    userName: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    emailID: { type: String, required: true, unique: true },
    userIcon: { type: String, required: false },
    address: { type: String, required: true },
    addressCoOrd: {
        lat: { type: Number },
        lng: { type: Number }
    },
    hash: String,
    salt: String,
});

UserDB.methods.setPassword = (passw) => {
    this.salt = crypto.randomBytes(16).toString('hex');

    this.hash = crypto
        .pbkdf2Sync(passw, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};

UserDB.methods.validPassword = (passw) => {
    const hash = crypto
        .pbkdf2Sync(passw, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.hash === hash;
};

export default model('User', UserDB);
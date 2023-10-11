import mongoose from "mongoose";
import crypto from "crypto";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    avatarURL: { type: String, required: false },
    address: { type: String, required: false },
    coord: { 
        lat: { type: Number },
        lng: { type: Number }
    },
    hash: String,
    salt: String
});

UserSchema.methods.setPassword = (password: crypto.BinaryLike) => {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto
                .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
                .toString('hex');
};

UserSchema.methods.validPassword = (password: crypto.BinaryLike) => {
    const hash = crypto
                 .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
                 .toString('hex');
    
    return this.hash === hash;
};

export default mongoose.model('user', UserSchema);
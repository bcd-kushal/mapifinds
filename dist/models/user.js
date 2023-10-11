"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const crypto_1 = __importDefault(require("crypto"));
const Schema = mongoose_1.default.Schema;
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
UserSchema.methods.setPassword = (password) => {
    this.salt = crypto_1.default.randomBytes(16).toString('hex');
    this.hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
};
UserSchema.methods.validPassword = (password) => {
    const hash = crypto_1.default
        .pbkdf2Sync(password, this.salt, 1000, 64, 'sha512')
        .toString('hex');
    return this.hash === hash;
};
exports.default = mongoose_1.default.model('user', UserSchema);

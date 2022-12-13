"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.SECRET_KEY = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
        match: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    provider: {
        type: String,
        required: true,
    },
    tokens: [{
            token: {
                type: String,
                required: true
            }
        }]
});
exports.SECRET_KEY = 'your-secret-key-here';
userSchema.methods.generateAuthToken = function () {
    try {
        console.log(this._id);
        const maxAge = 3 * 24 * 60 * 60;
        const token = jsonwebtoken_1.default.sign({ _id: this._id.toString(), username: this.username, email: this.email }, exports.SECRET_KEY, { expiresIn: maxAge });
        console.log("token - " + token);
        return token;
    }
    catch (error) {
        // res.send("this error part"+ error);
        console.log("the error part" + error);
    }
};
exports.UserModel = mongoose_1.default.model("user", userSchema);

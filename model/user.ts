import mongoose from "mongoose";
import jwt, { Secret } from "jsonwebtoken";
// require('dotenv').config();

export interface I_UserDocument extends mongoose.Document {
  username: string;
  email: string;
  password: string;
  isVerified: Boolean;
  provider: string;
  tokens: {
    token: string;
  };
  generateAuthToken(): string;
}

const userSchema: mongoose.Schema<I_UserDocument> = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    match: /^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
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
});
export const SECRET_KEY: Secret = "your-secret-key-here";
userSchema.methods.generateAuthToken = function () {
  try {
    console.log(this._id);
    const maxAge: number = 3 * 24 * 60 * 60;
    const token = jwt.sign(
      { _id: this._id.toString(), username: this.username, email: this.email },
      SECRET_KEY,
      { expiresIn: maxAge }
    );
    console.log("token - " + token);
    return token;
  } catch (error) {
    // res.send("this error part"+ error);
    console.log("the error part" + error);
  }
};

export const UserModel = mongoose.model<I_UserDocument>("user", userSchema);

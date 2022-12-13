import express from "express";
import { Request, Response } from "express";
import { UserModel, I_UserDocument } from "../model/user";
import bcryptjs from "bcryptjs";
import validator from "email-validator";

export const signup = (req: Request, res: Response) => {
  const { email, username, password, confirmpassword } = req.body;

  if (validator.validate(email)) {
    console.log("Email is valid");
  } else {
    res.render("signup", { err: "Email is inValid !" });
  }

  if (!email || !username || !password || !confirmpassword) {
    res.render("signup", { err: "All Fields Required !" });
  } else if (password != confirmpassword) {
    res.render("signup", { err: "Password Don't Match !" });
  } else {
    // check if a user exists
    UserModel.findOne(
      { $or: [{ email: email }, { username: username }] },
      function (err: Error, data: any) {
        if (err) throw err;
        if (data) {
          res.render("signup", { err: "User Exists, Try Logging In !" });
        } else {
          bcryptjs.genSalt(12, (err: Error, salt: string) => {
            if (err) throw err;
            // hash the password
            bcryptjs.hash(password, salt, (err: Error, hash: string) => {
              if (err) throw err;
              // save user in db
              new UserModel({
                username: username,
                email: email,
                password: hash,
                provider: "email",
              }).save((err, data) => {
                if (err) {
                  // console.log(err.errors['username'].message);
                  res.status(400).json({
                    statuscode: 400,
                    message: err.message,
                  });
                } else {
                  res.redirect("/login");
                }
              });
            });
          });
        }
      }
    );
  }
};

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { UserModel, SECRET_KEY, I_UserDocument } from "../model/user";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.set(
      "Cache-Control",
      "no-cache, private, no-store, must-revalidate, post-check=0, pre-check=0"
    );
    const token = req.cookies.jwt;
    const verifyUser: I_UserDocument = jwt.verify(
      token,
      SECRET_KEY
    ) as I_UserDocument;
    console.log(verifyUser);
    const data: I_UserDocument = (await UserModel.findOne({
      _id: verifyUser._id,
    })) as I_UserDocument;
    console.log(data.username);
    // req.token=token;
    // req.data=data;
    next();
  } catch (error) {
    // res.status(401).send(error);
    req.flash("error_messages", "Please Login to continue !");
    res.redirect("/login");
  }
};

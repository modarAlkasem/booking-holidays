import express, { Request, Response } from "express";
import { check, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/user";
import verifyToken from "../middleware/auth";

const router = express.Router();

router.post(
  "/login",
  [
    check("email", "Email is required").isEmail(),
    check("password", "Password with 6 or more characters required").isLength({
      min: 6,
    }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ mesage: errors.array() });
      return;
    }
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        email: email,
      });
      if (!user) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        res.status(400).json({ message: "Invalid credentials" });
        return;
      }
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1d",
      });
      res.cookie("auth_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV == "production",
        maxAge: 86400000,
      });
      res.status(200).json({ userId: user._id });
      return;
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: "Something went wrong" });
      return;
    }
  }
);

router.get("/validate-token", verifyToken, (req: Request, res: Response) => {
  res.status(200).json({
    message: "Authorized",
    data: {
      userId: req.userId,
    },
  });
});

router.post("/logout", (req: Request, res: Response) => {
  res.cookie("auth_token", "", {
    expires: new Date(0),
  });
  res.send();
});
export default router;

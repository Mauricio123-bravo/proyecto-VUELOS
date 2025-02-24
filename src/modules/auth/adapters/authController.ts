import { Request, Response } from "express";
import LoginUseCase from "../use_cases/login";
import RegisterUseCase from "../use_cases/register";
import { InvalidCredentials } from "../models/credential.error";
import { User } from "../../users/models/user.model";

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  login = (req: Request, res: Response) => {
    const user: User = req.body;
    this.loginUseCase
      .login(user, req.ip!)
      .then((data) => {
        res.cookie("Authorization", data.access, {
          expires: new Date(Date.now() + 60 * 60),
          secure: true,
          sameSite: "none",
          httpOnly: true,
        });
        res.cookie("X-Refresh-Token", data.refresh, {
          expires: new Date(Date.now() + 60 * 60 * 5),
          secure: true,
          sameSite: "none",
          httpOnly: true,
        });

        res.status(200).json({
          message: "Login successfully",
        });
      })
      .catch((err) => {
        if (err instanceof InvalidCredentials) {
          return res.status(401).json({ message: err.message });
        } else {
          return res.status(500).json({ message: "server error" });
        }
      });
  };

  register = (req: Request, res: Response) => {
    const user = req.body;
    this.registerUseCase
      .register(user)
      .then((id) => {
        res.status(201).json({ id });
      })
      .catch((err) => {
        console.log(err);
        res
          .status(400)
          .json({ message: "Can't create the user, check your data." });
      });
  };
}

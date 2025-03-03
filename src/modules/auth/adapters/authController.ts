import { Request, Response } from "express";
import LoginUseCase from "../use_cases/login";
import RegisterUseCase from "../use_cases/register";
import { InvalidCredentials } from "../models/errors/credential.error";
import { User } from "../../users/models/user.model";
import { ACCESS_EXPIRATION_TIME, REFRESH_EXPIRATION_TIME } from "../../../config/vars";

export class AuthController {
  constructor(
    private readonly loginUseCase: LoginUseCase,
    private readonly registerUseCase: RegisterUseCase,
  ) {}

  login = (req: Request, res: Response) => {
    const user: User = req.body;
    this.loginUseCase
      .login(user, req.ip!)
      .then(({access, refresh}) => {
        res.cookie("Authorization", access, {
          expires: new Date(Date.now() + ACCESS_EXPIRATION_TIME * 1000),
          secure: true,
          sameSite: "none",
          httpOnly: true,
        });

        res.cookie("X-Refresh-Token", refresh, {
          expires: new Date(Date.now() + REFRESH_EXPIRATION_TIME * 1000),
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

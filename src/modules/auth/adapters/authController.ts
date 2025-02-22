import { InvalidCredentials } from "@auth/models/credentialError";
import LoginUseCase from "@auth/use_cases/login";
import { User } from "@users/models/user.model";
import { Request, Response } from "express";

export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  login = (req: Request, res: Response) => {
    const user: User = req.body;
    this.loginUseCase
      .login(user)
      .then((data) =>
        res.status(200).json({
          token: data,
        }),
      )
      .catch((err) => {
        if (err instanceof InvalidCredentials) {
          return res.status(401).json({ message: err.message });
        } else {
          return res.status(500).json({ message: "server error" });
        }
      });
  };
}

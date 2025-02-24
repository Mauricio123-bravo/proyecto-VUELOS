import { Request, Response, NextFunction } from "express";
import { AuthenticateUseCase } from "../use_cases/authenticate";
import { ExpiredToken } from "../models/expired.error";

export class AuthMiddleware {
  constructor(private readonly authUseCase: AuthenticateUseCase) {}

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies["Authorization"];
    const refresh = req.cookies["X-Refresh-Token"];
    const ip = req.ip!;

    if (!token || !refresh) {
      res.status(401).json({ message: "invalid credentials" });
      return;
    }

    try {
      await this.authUseCase.authenticate(token);
      next();
    } catch (error) {
      if (error instanceof ExpiredToken) {
        token = this.authUseCase.getAccessToken(ip!, refresh);
        res.cookie("Authorization", token, {
          expires: new Date(Date.now() + 60 * 60),
          secure: true,
          sameSite: "none",
          httpOnly: true,
        });

        next();
        return;
      }

      res.status(401).json({ message: "invalid credentials" });
    }
  };
}

import { Request, Response, NextFunction } from "express";
import { AuthenticateUseCase } from "../use_cases/authenticate";
import { ExpiredToken } from "../models/errors/expired.error";
import { REFRESH_EXPIRATION_TIME } from "../../../config/vars";

export class AuthMiddleware {
  constructor(private readonly authUseCase: AuthenticateUseCase) {}

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies["Authorization"];
    const refresh = req.cookies["X-Refresh-Token"];
    const ip = req.ip!;

    if (!token || !refresh) {
        console.log("tokens not provided");
        
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
          expires: new Date(Date.now() + REFRESH_EXPIRATION_TIME),
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

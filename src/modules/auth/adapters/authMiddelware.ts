import { Request, Response, NextFunction, RequestHandler } from "express";
import { AuthenticateUseCase } from "../use_cases/authenticate";
import { ExpiredToken } from "../models/errors/expired.error";
import { REFRESH_EXPIRATION_TIME } from "../../../config/vars";
import JWTProvider from "./jwtTokenProvider";

export class AuthMiddleware {
  constructor(private readonly authUseCase: AuthenticateUseCase,
    private readonly jwtProvider: JWTProvider
  ) { }

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


  authorizeRole = (allowedRoles: string[]): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.cookies["Authorization"];
        
        const payload = this.jwtProvider.getPayload(token);
        if (!allowedRoles.includes(payload.role)) {
          res.status(403).json({ message: "Access denied" });
          return
        }
        next();
      } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return
      }
    };
  };


}

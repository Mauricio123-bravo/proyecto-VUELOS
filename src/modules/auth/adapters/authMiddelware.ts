import { Request, Response, NextFunction, RequestHandler } from "express";
import { AuthenticateUseCase } from "../use_cases/authenticate";
import { ExpiredToken } from "../models/errors/expired.error";
import { ACCESS_EXPIRATION_TIME, REFRESH_EXPIRATION_TIME } from "../../../config/vars";
import JWTProvider from "./jwtTokenProvider";
import { ForbiddenError } from "../../shared/errors/forbidden.error";
import { ServerError } from "../../shared/errors/server.error";

export class AuthMiddleware {
  constructor(
    private readonly authUseCase: AuthenticateUseCase,
    private readonly jwtProvider: JWTProvider,
  ) { }

  authenticate = async (req: Request, res: Response, next: NextFunction) => {
    let token = req.cookies["Authorization"] as string;
    const refresh = req.cookies["X-Refresh-Token"] as string;
    const ip = req.ip!;

    if (!token || !refresh) {
      res.status(401).json({ message: "invalid credentials" });
      return;
    }

    console.log("TOKENNN", token);
    console.log("TOKENNN", refresh);

    try {
      await this.authUseCase.authenticate(token);
      next();
      return;
    } catch (error) {
      if (!(error instanceof ExpiredToken)) {
        res.status(401).json({ message: "invalid credentials" });
        return;
      }
    }

    try {
      token = await this.authUseCase.getAccessToken(ip!, refresh);

      res.cookie("Authorization", token, {
        expires: new Date(Date.now() + REFRESH_EXPIRATION_TIME * 1000),
        secure: true,
        sameSite: "none",
        httpOnly: true,
      });
      next();
    } catch (error) {
      if (error instanceof ForbiddenError) {
        res.status(403).json({ message: error.message });
        return;
      }

      res.status(500).json({ message: new ServerError().message });
    }
  };

  authorizeRole = (allowedRoles: string[]): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        const token = req.cookies["Authorization"];

        const payload = this.jwtProvider.getPayload(token);
        if (!allowedRoles.includes(payload.role)) {
          res.status(403).json({ message: "Access denied" });
          return;
        }
        next();
      } catch (error) {
        res.status(401).json({ message: "Invalid token" });
        return;
      }
    };
  };
}

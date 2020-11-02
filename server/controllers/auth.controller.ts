import {Request, Response} from "express";
import jwt from "jsonwebtoken";

import {User} from "../inferfaces/user";
import AuthService from "../services/auth.service";
import {ACCESS_SECRET_KEY, REFRESH_SECRET_KEY} from "../config";

class AuthController {
    async signIn(req: Request, res: Response): Promise<void> {
        const {login, password}: { login: string, password: string } = req.body;
        const user: User = await AuthService.signIn(login, password);
        if (user) {
            const payload = {
                id: user.id,
                login: user.login,
                exp: Date.now() + 900000
            };
            const accessToken = jwt.sign(payload, ACCESS_SECRET_KEY);
            const refreshToken = jwt.sign(payload, REFRESH_SECRET_KEY);
            await AuthService.saveToken(user.id, refreshToken);
            res.cookie('refresh_token', refreshToken, {
                expires: new Date(Date.now() + 900000),
                httpOnly: true
            });
            res.send({user, token: accessToken});
        } else {
            res.send("Не существует");
        }
    }

    async signUp(req: Request, res: Response): Promise<void> {
        res.send(200);
    }
}

export default new AuthController();
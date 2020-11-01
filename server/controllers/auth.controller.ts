import {Request, Response} from "express";
import jwt from "jsonwebtoken";

import {User} from "../inferfaces/user";
import AuthService from "../services/auth.service";
import {SECRET_KEY} from "../config";

class AuthController {
    async signIn(req: Request, res: Response): Promise<void> {
        const {login, password}: { login: string, password: string } = req.body;
        const user: User = await AuthService.signIn(login, password);
        const payload = {id: user.id, login: user.login};
        const token = jwt.sign(payload, SECRET_KEY);
        res.send({user, token});
    }

    async signUp(req: Request, res: Response): Promise<void> {
        res.send(200);
    }
}

export default new AuthController();
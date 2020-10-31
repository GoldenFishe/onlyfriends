import {Request, Response} from "express";
import jwt from "jsonwebtoken";

import {User} from "../inferfaces/user";
import * as UserModel from "../models/user";

export const signIn = async (req: Request, res: Response): Promise<void> => {
    const {login, password}: { login: string, password: string } = req.body;
    const user: User = await UserModel.signIn(login, password);
    const payload = {id: user.id, login: user.login};
    const token = jwt.sign(payload, 'secret');
    res.send({user, token});
};

export const getUserInfo = async (req: Request, res: Response): Promise<void> => {
    const userId: number = Number(req.params['userId']);
    const userInfo: User = await UserModel.getUserById(userId);
    res.send(userInfo);
};

export const getUserPotentialFriends = async (req: Request, res: Response): Promise<void> => {
    const userId: number = Number(req.params['userId']);
    const potentialFriends: User[] = await UserModel.getUserPotentialFriendsById(userId);
    res.send(potentialFriends);
};
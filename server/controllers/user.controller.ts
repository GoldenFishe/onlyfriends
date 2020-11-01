import {Request, Response} from "express";

import {User} from "../inferfaces/user";
import UserService from "../services/user.service";

class UserController {
    async getUserInfo(req: Request, res: Response): Promise<void> {
        const userId: number = Number(req.params['userId']);
        const userInfo: User = await UserService.getUserById(userId);
        res.send(userInfo);
    }

    async getUserPotentialFriends(req: Request, res: Response): Promise<void> {
        const userId: number = Number(req.params['userId']);
        const potentialFriends: User[] = await UserService.getUserPotentialFriendsById(userId);
        res.send(potentialFriends);
    }
}

export default new UserController();
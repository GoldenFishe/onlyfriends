import {query} from "../utils/db";
import {User} from "../inferfaces/user";

class AuthService {
    async signIn(login: string, password: string): Promise<User> {
        const [user] = await query(`SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`);
        return user;
    }

    async saveToken(userId: number, token: string): Promise<void> {
        return query(`UPDATE users SET token = ${token} WHERE id = ${userId}`);
    }
}

export default new AuthService();
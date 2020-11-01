import {query} from "../utils/db";
import {User} from "../inferfaces/user";

class AuthService {
    async signIn(login: string, password: string): Promise<User> {
        const [user] = await query(`SELECT * FROM users WHERE login = '${login}' AND password = '${password}'`);
        return user;
    }
}

export default new AuthService();
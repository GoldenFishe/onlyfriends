import {query} from "../utils/db";
import {User} from "../inferfaces/user";
import {Film} from "../inferfaces/film";

class UserService {
    async getUserById(userId: number): Promise<User> {
        const [user] = await query(`SELECT * FROM users WHERE id = ${userId}`);
        return user;
    }

    async getUserPotentialFriendsById(userId: number): Promise<User[]> {
        const films: Film[] = await query(`SELECT * FROM films WHERE user_id = ${userId}`);
        const usersWithSimilarFilmsPromises = films.map(film => query(`SELECT * FROM films WHERE title = '${film.title}' AND user_id != ${userId}`));
        const usersWithSimilarFilms: Film[][] = await Promise.all(usersWithSimilarFilmsPromises);
        const usersIds: number[] = usersWithSimilarFilms
            .reduce((acc, cur) => ([...acc, ...cur]), [])
            .map((film: Film) => film.user_id);
        const uniqUsersIds = [...new Set(usersIds)];
        const potentialFriendsPromises = uniqUsersIds.map(userId => query(`SELECT * FROM users WHERE id = ${userId}`));
        const potentialFriends = await Promise.all(potentialFriendsPromises);
        return potentialFriends.reduce((acc, cur) => ([...acc, ...cur]), []);
    }
}

export default new UserService();
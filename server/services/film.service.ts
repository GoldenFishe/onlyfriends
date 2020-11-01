import {query} from "../utils/db";
import {Film} from "../inferfaces/film";

class FilmService {
    getUserFilms(userId: number): Promise<Film[]> {
        return query(`SELECT * FROM films WHERE user_id = ${userId}`);
    }

    async saveUserFilm(title: string, userId: number): Promise<Film> {
        const [film]: Film[] = await query(`INSERT INTO films (title, user_id) VALUES ('${title}', ${userId}) RETURNING *`);
        return film;
    }
}

export default new FilmService();
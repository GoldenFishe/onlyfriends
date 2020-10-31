import {query} from "../utils/db";
import {Film} from "../inferfaces/film";

export const getUserFilms = (userId: number): Promise<Film[]> => {
    return query(`SELECT * FROM films WHERE user_id = ${userId}`);
};

export const saveUserFilm = async (title: string, userId: number): Promise<Film> => {
    const [film]: Film[] = await query(`INSERT INTO films (title, user_id) VALUES ('${title}', ${userId}) RETURNING *`);
    return film;
};
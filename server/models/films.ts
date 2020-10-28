import {query} from "../utils/db";
import {Film} from "../inferfaces/film";

export const getUserFilms = (): Promise<Film[]> => {
    return query(`SELECT * FROM films`);
};

export const saveUserFilm = (title: string, userId: number): Promise<Film[]> => {
    return query(`INSERT INTO films (title, user_id) VALUES ('${title}', ${userId}) RETURNING *`);
};
import {Request, Response} from "express";
import {getUserFilms, saveUserFilm} from "../models/films";
import {Film} from "../inferfaces/film";

export const getFilms = async (req: Request, res: Response): Promise<void> => {
    const films: Film[] = await getUserFilms();
    res.send(films);
};

export const saveFilm = async (req: Request, res: Response): Promise<void> => {
    const {title, user_id}: { title: string, user_id: number } = req.body;
    const films: Film[] = await saveUserFilm(title, user_id);
    res.send(films);
};
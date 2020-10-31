import {Request, Response} from "express";
import {getUserFilms, saveUserFilm} from "../models/films";
import {Film} from "../inferfaces/film";

export const getFilms = async (req: Request, res: Response): Promise<void> => {
    const {userId}: { userId: number } = req.body;
    const films: Film[] = await getUserFilms(userId);
    res.send(films);
};

export const saveFilm = async (req: Request, res: Response): Promise<void> => {
    const {title, userId}: { title: string, userId: number } = req.body;
    const film: Film = await saveUserFilm(title, userId);
    res.send(film);
};
import {Request, Response} from "express";

import {Film} from "../inferfaces/film";
import FilmsService from "../services/film.service";

class FilmController {
    async getFilms(req: Request, res: Response): Promise<void> {
        const {userId}: { userId: number } = req.body;
        const films: Film[] = await FilmsService.getUserFilms(userId);
        res.send(films);
    }

    async saveFilm(req: Request, res: Response): Promise<void> {
        const {title, userId}: { title: string, userId: number } = req.body;
        const film: Film = await FilmsService.saveUserFilm(title, userId);
        res.send(film);
    }
}

export default new FilmController();
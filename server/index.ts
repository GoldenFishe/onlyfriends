import express, {Express} from "express";
import bodyParser from "body-parser";
import {getFilms, saveFilm} from "./controllers/films";

const PORT: number | string = process.env.POR || 8080;
const app: Express = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/api/films', getFilms);
app.post('/api/film', saveFilm);

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));
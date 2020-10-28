"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const films_1 = require("./controllers/films");
const PORT = process.env.POR || 8080;
const app = express_1.default();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.get('/api/films', films_1.getFilms);
app.post('/api/film', films_1.saveFilm);
app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));

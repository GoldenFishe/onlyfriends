"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const film_service_1 = __importDefault(require("../services/film.service"));
class FilmController {
    getFilms(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { userId } = req.body;
            const films = yield film_service_1.default.getUserFilms(userId);
            res.send(films);
        });
    }
    saveFilm(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title, userId } = req.body;
            const film = yield film_service_1.default.saveUserFilm(title, userId);
            res.send(film);
        });
    }
}
exports.default = new FilmController();

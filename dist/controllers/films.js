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
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveFilm = exports.getFilms = void 0;
const films_1 = require("../models/films");
exports.getFilms = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const films = yield films_1.getUserFilms();
    res.send(films);
});
exports.saveFilm = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, user_id } = req.body;
    const films = yield films_1.saveUserFilm(title, user_id);
    res.send(films);
});

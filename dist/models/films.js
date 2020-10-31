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
exports.saveUserFilm = exports.getUserFilms = void 0;
const db_1 = require("../utils/db");
exports.getUserFilms = (userId) => {
    return db_1.query(`SELECT * FROM films WHERE user_id = ${userId}`);
};
exports.saveUserFilm = (title, userId) => __awaiter(void 0, void 0, void 0, function* () {
    const [film] = yield db_1.query(`INSERT INTO films (title, user_id) VALUES ('${title}', ${userId}) RETURNING *`);
    return film;
});

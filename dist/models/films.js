"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveUserFilm = exports.getUserFilms = void 0;
const db_1 = require("../utils/db");
exports.getUserFilms = () => {
    return db_1.query(`SELECT * FROM films`);
};
exports.saveUserFilm = (title, userId) => {
    return db_1.query(`INSERT INTO films (title, user_id) VALUES ('${title}', ${userId}) RETURNING *`);
};

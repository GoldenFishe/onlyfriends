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
const db_1 = require("../utils/db");
class UserService {
    getUserById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const [user] = yield db_1.query(`SELECT * FROM users WHERE id = ${userId}`);
            return user;
        });
    }
    getUserPotentialFriendsById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const films = yield db_1.query(`SELECT * FROM films WHERE user_id = ${userId}`);
            const usersWithSimilarFilmsPromises = films.map(film => db_1.query(`SELECT * FROM films WHERE title = '${film.title}' AND user_id != ${userId}`));
            const usersWithSimilarFilms = yield Promise.all(usersWithSimilarFilmsPromises);
            const usersIds = usersWithSimilarFilms
                .reduce((acc, cur) => ([...acc, ...cur]), [])
                .map((film) => film.user_id);
            const uniqUsersIds = [...new Set(usersIds)];
            const potentialFriendsPromises = uniqUsersIds.map(userId => db_1.query(`SELECT * FROM users WHERE id = ${userId}`));
            const potentialFriends = yield Promise.all(potentialFriendsPromises);
            return potentialFriends.reduce((acc, cur) => ([...acc, ...cur]), []);
        });
    }
}
exports.default = new UserService();

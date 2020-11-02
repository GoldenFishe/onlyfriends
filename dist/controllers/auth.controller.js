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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth_service_1 = __importDefault(require("../services/auth.service"));
const config_1 = require("../config");
class AuthController {
    signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { login, password } = req.body;
            const user = yield auth_service_1.default.signIn(login, password);
            if (user) {
                const payload = {
                    id: user.id,
                    login: user.login,
                    exp: Date.now() + 900000
                };
                const accessToken = jsonwebtoken_1.default.sign(payload, config_1.ACCESS_SECRET_KEY);
                const refreshToken = jsonwebtoken_1.default.sign(payload, config_1.REFRESH_SECRET_KEY);
                yield auth_service_1.default.saveToken(user.id, refreshToken);
                res.cookie('refresh_token', refreshToken, {
                    expires: new Date(Date.now() + 900000),
                    httpOnly: true
                });
                res.send({ user, token: accessToken });
            }
            else {
                res.send("Не существует");
            }
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.send(200);
        });
    }
}
exports.default = new AuthController();

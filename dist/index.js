"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const film_controller_1 = __importDefault(require("./controllers/film.controller"));
const user_controller_1 = __importDefault(require("./controllers/user.controller"));
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const config_1 = require("./config");
const app = express_1.default();
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config_1.ACCESS_SECRET_KEY
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);
    return done(null, 'test');
    // User.findOne({id: jwt_payload.sub}, function (err, user) {
    //     if (err) {
    //         return done(err, false);
    //     }
    //     if (user) {
    //         return done(null, user);
    //     } else {
    //         return done(null, false);
    //         // or you could create a new account
    //     }
    // });
}));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use(cookie_parser_1.default());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
const authMiddleware = passport_1.default.authenticate('jwt', { session: false });
app.post('/api/auth/sign-in', auth_controller_1.default.signIn);
app.post('/api/auth/sign-up', auth_controller_1.default.signUp);
app.post('/api/films', authMiddleware, film_controller_1.default.getFilms);
app.post('/api/film', authMiddleware, film_controller_1.default.saveFilm);
app.get('/api/user/:userId', authMiddleware, user_controller_1.default.getUserInfo);
app.get('/api/potential-friends/:userId', authMiddleware, user_controller_1.default.getUserPotentialFriends);
app.listen(config_1.PORT, () => console.log(`Server is listening port ${config_1.PORT}`));

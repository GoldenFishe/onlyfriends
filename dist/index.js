"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const passport_1 = __importDefault(require("passport"));
const passport_jwt_1 = require("passport-jwt");
const films_1 = require("./controllers/films");
const user_1 = require("./controllers/user");
const PORT = process.env.POR || 8080;
const app = express_1.default();
const opts = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
};
passport_1.default.use(new passport_jwt_1.Strategy(opts, function (jwt_payload, done) {
    console.log(jwt_payload);
    return done(null, 'user');
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
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.post('/api/sign-in', user_1.signIn);
app.post('/api/films', passport_1.default.authenticate('jwt', { session: false }), films_1.getFilms);
app.post('/api/film', films_1.saveFilm);
app.get('/api/user/:userId', user_1.getUserInfo);
app.get('/api/potential-friends/:userId', user_1.getUserPotentialFriends);
app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));

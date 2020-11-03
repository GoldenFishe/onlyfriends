import express, {Express} from "express";
import bodyParser from "body-parser";
import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";
import cookieParser from "cookie-parser";

import FilmController from "./controllers/film.controller";
import UserController from "./controllers/user.controller";
import AuthController from "./controllers/auth.controller";
import {PORT, ACCESS_SECRET_KEY} from "./config";

const app: Express = express();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: ACCESS_SECRET_KEY
}
passport.use(new Strategy(opts, function (jwt_payload, done) {
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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});
app.use(passport.initialize());
app.use(passport.session());

const authMiddleware = passport.authenticate('jwt', {session: false});

app.post('/api/auth/sign-in', AuthController.signIn)
app.post('/api/auth/sign-up', AuthController.signUp)
app.post('/api/films', authMiddleware, FilmController.getFilms);
app.post('/api/film', authMiddleware, FilmController.saveFilm);
app.get('/api/user/:userId', authMiddleware, UserController.getUserInfo);
app.get('/api/potential-friends/:userId', authMiddleware, UserController.getUserPotentialFriends);

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));
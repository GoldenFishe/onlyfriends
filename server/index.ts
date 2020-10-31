import express, {Express} from "express";
import bodyParser from "body-parser";
import passport from "passport";
import {Strategy, ExtractJwt} from "passport-jwt";

import {getFilms, saveFilm} from "./controllers/films";
import {getUserInfo, getUserPotentialFriends, signIn} from "./controllers/user";

const PORT: number | string = process.env.POR || 8080;
const app: Express = express();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
}
passport.use(new Strategy(opts, function (jwt_payload, done) {
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

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    next();
});
app.use(passport.initialize());
app.use(passport.session());

app.post('/api/sign-in', signIn)
app.post('/api/films', passport.authenticate('jwt', {session: false}), getFilms);
app.post('/api/film', saveFilm);
app.get('/api/user/:userId', getUserInfo);
app.get('/api/potential-friends/:userId', getUserPotentialFriends);

app.listen(PORT, () => console.log(`Server is listening port ${PORT}`));
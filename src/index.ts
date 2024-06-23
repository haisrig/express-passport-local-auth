import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import passport from 'passport';
import { initLocalAuthentication } from "./strategies/local";
import { createUserRouter } from './routes/user';
import { createAuthRouter } from "./routes/auth";

mongoose.connect("mongodb://127.0.0.1/local_auth_app")
    .then(() => console.log("DB Connection is successful"))
    .catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
    session({
        secret: "test",
        saveUninitialized: true,
        resave: false,
        cookie: {
            maxAge: 60000,
        },
        store: MongoStore.create({
            client: mongoose.connection.getClient(),
        }),
    })
);
initLocalAuthentication();
app.use(passport.session());
app.use("/api", createAuthRouter());
app.use("/api/user", createUserRouter());

app.listen(3000, () => {
    console.log("Server stared.");
});

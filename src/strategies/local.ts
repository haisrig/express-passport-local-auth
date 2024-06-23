import passport from "passport";
import * as passportStrategy from "passport-local";
import { User } from "../mongo/schemas/user";
import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/types";

export function initLocalAuthentication() {

    //@ts-ignore
    passport.serializeUser((req, user, done) => {
        done(null, user.username);
    });

    passport.deserializeUser(async (username, done) => {
        const findUser = await User.findOne({ username });        
        done(null, findUser);
    });

    passport.use(new passportStrategy.Strategy(async (username, password, done) => {
        try {
            const user = await User.findOne({ username });
            if(!user || !bcrypt.compareSync(password, user.password)) {
                throw new Error("Bad Credentials!!!");
            }
            done(null, user);
        } catch(err) {
            console.log(err);
            done(err, false);
        }
    }));
}

export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
    if(request.user) {
        return next();
    }
    return response.sendStatus(401);
}
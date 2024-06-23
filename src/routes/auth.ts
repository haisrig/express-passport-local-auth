import { Router, request, response } from "express";
import { login, loginStatus, logout, signup } from "../handlers/auth";
import passport from "passport";

export function createAuthRouter() {
    const router = Router();
    router.post("/login", passport.authenticate("local"), login);
    router.get("/login/status", loginStatus);
    router.post("/logout", logout);
    return router;
}
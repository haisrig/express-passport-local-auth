import { Router } from "express";
import { addUSer, createUserCollection, deleteUser, getAllUsers, getUserByName, updateUser } from "../handlers/user";
import { checkSchema } from "express-validator";
import { addUserSchema } from "../validators/userValidator";
import { isAuthenticated } from "../strategies/local";

export function createUserRouter() {
    createUserCollection()
    const router = Router();
    router.get("/", isAuthenticated, getAllUsers);
    router.get("/:username", isAuthenticated, getUserByName);
    router.post("/", isAuthenticated, checkSchema(addUserSchema), addUSer);
    router.patch("/:username", isAuthenticated, updateUser);
    router.delete("/:username", isAuthenticated, deleteUser);
    return router
}
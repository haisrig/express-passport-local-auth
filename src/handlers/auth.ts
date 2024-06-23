import { Request, Response } from "express";
import { IUser } from "../types/types";
import { matchedData, validationResult } from "express-validator";
import { User } from "../mongo/schemas/user";
import passport from "passport";

export async function signup(request: Request<{}, {}, IUser>, response: Response) {    
    const result = validationResult(request);
    if(!result.isEmpty()) {
        return response.status(400).send(result);        
    }
    const data = matchedData(request);
    const newUser = new User(data);
    try {
        const user = await newUser.save();
        return response.status(200).send("User signup is successful.");
    } catch(err) {
        return response.status(500).send(err);
    }
}

export function login(request: Request<{}, {}, IUser>, response: Response) {
    return response.status(200).send("Login Successful.");   
}

export function loginStatus(request: Request<{}, {}, IUser>, response: Response) { 
    if(request.user) {       
        return response.status(200).send("User loggedin.")
    }
    return response.status(200).send("User not loggedin.")
}

export function logout(request: Request<{}, {}, IUser>, response: Response) {
    if (!request.user) return response.status(401).send("User not loggedin.");
	request.logout((err) => {
		if (err) return response.sendStatus(500);
		response.status(200).send("Logout Successfull.");
	});
}
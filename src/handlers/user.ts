import { Request, Response } from "express";
import { User } from "../mongo/schemas/user";
import mongoose from "mongoose";
import { IUser } from "../types/types";
import { matchedData, validationResult } from "express-validator";
import bcrypt from 'bcrypt';

let userCollection: mongoose.mongo.Collection;

export function createUserCollection() {
    userCollection = mongoose.connection.getClient().db("local_auth_app").collection("users");
}

export function getAllUsers(request: Request<{[key: string]: string}, {}, IUser>, response: Response) {
    console.log("All users...");
    userCollection.find({}, { projection: { _id: 0, username: 1, displayName: 1 } }).toArray()
    .then((result) => {
        return response.status(200).send(result)
    })
    .catch((err) => console.log(err));
}

export function getUserByName(request: Request<{[key: string]: string}, {}, IUser>, response: Response) {    
    const { username } = request.params;
    userCollection.findOne({username: username}, { projection: { _id: 0, username: 1, password: 1, displayName: 1 } })
    .then((result) => {
        if(!result) {
            return response.sendStatus(404);
        }
        return response.status(200).send(result);
    })
    .catch((err) => {
        console.log(err);
        return response.sendStatus(500);
    });
}

export async function addUSer(request: Request<{[key: string]: string}, {}, IUser>, response: Response) {
    const result = validationResult(request);
    if(!result.isEmpty()) {
        return response.status(400).send(result);        
    }
    const data = matchedData(request);
    const salt = bcrypt.genSaltSync(10);	
    data.password = bcrypt.hashSync(data.password, salt);
    const newUser = new User(data);
    try {
        await newUser.save();
        return response.status(200).send("New user got added successfully!!!");
    } catch(err) {
        return response.status(500).send(err);
    }
}

export function updateUser(request: Request, response: Response) {
    const { username } = request.params;
    const body = request.body;
    var newvalues = { $set: {...body} };
    userCollection.updateOne({username: username}, newvalues)
    .then((result) => {
        return response.status(200).send(result);
    })
    .catch((err) => {
        console.log(err);
        return response.status(500).send(err);
    });
}

export function deleteUser(request: Request<{[key: string]: string}, {}, IUser>, response: Response) {
    const { username } = request.params;
    userCollection.deleteOne({username: username})
    .then((result) => {
        return response.sendStatus(204);
    })
    .catch((err) => {
        console.log(err);
        return response.status(500).send(err);
    });
    
}
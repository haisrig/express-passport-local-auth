import { NextFunction, Request, RequestParamHandler, Response } from "express";
import { ExpressValidator } from "express-validator";

export const addUserSchema = {
    username: {
        notEmpty: {
			errorMessage: "Username must be present.",
		},
		isLength: {
			options: {
				min: 6,
				max: 30,
			},
			errorMessage:
				"Username length must be between 5-30.",
		}
    },
    password: {
		notEmpty: {
			errorMessage: "Password must be present.",
		},
	},
    displayName: {
		notEmpty: {
			errorMessage: "DisplayName must be present.",
		},
	}	
}
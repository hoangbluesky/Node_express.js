import { NextFunction, Response } from "express";

export const checkAuth = (req: any, res: Response, next: NextFunction) => {
    const {userId } = req.cookies;
    if(userId) {
        next();
    } else {
        res.redirect('/login');
    }
}
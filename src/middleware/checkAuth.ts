import { NextFunction, Response } from "express";

export const checkAuth = (req: any, res: Response, next: NextFunction) => {
    const {userId } = req.session;
    if(userId) {
        next();
    } else {
        res.redirect('/login');
    }
}
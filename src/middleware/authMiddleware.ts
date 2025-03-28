import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthRequest extends Request {
    user?: {
        userId: number;
        userName: string;  // ✅ Thêm userName vào đây
        userEmail: string; // ✅ Thêm userEmail vào đây
    };
}
const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.auth_token;

    if (token) {
        try {
            const decoded = jwt.verify(token, "your_secret_key") as {
                userId: number;
                userName: string;
                userEmail: string;
            };
            req.user = decoded;
            res.locals.user = decoded;
        } catch (err) {
            console.log("Invalid token");
        }
    } else {
        res.locals.user = null;
    }

    next();
};


export default authMiddleware;
export { AuthRequest };

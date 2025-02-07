import { Request, Response } from "express";
import UserService from "@services/userService";
import { User } from "@entity/User";
class HomeController{
//SHOW
    static async showIndex(req: Request, res: Response) {
        try {
            const users: User[] = await UserService.getAllUsers();  
            res.render('index.ejs', {users: users});
        }catch (e) {
            console.error(e);
            res.status(500).send('Server Error');  // server error
        }
    }
    static async showLogin(req: Request, res: Response){
        res.render('auths/login');
    }
    static async showRegister(req: Request, res: Response){
        res.render('auths/register');
    }
    static async showHome(req: Request, res: Response){
        res.render('home/checkout');
    }
//POST
    static async register(req: Request, res: Response){
        UserService.createUser(req.body); 
        res.redirect('/login');
    }
}
export default HomeController
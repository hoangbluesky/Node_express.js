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
    static async showHome(req: Request, res: Response){
        res.render('home/home',);
    }
    static async showCart(req: Request, res: Response){
        res.render('home/cart',);
    }
    static async showCheckout(req: Request, res: Response){
        res.render('home/checkout',);
    }
    static async showDetail(req: Request, res: Response){
        res.render('home/detail',);
    }
    static async showShop(req: Request, res: Response){
        res.render('home/shop',);
    }











//LOGIN REGISTER
    static async showLogin(req: Request, res: Response){
        const {email, errorLogin} = req.cookies;
        res.render('auths/login', {email: email, errorLogin: errorLogin});
    }
    static async showRegister(req: Request, res: Response){
        res.render('auths/register');
    }
//POST
    static async register(req: Request, res: Response){
        UserService.createUser(req.body);
        res.cookie('email', req.body.email ,{maxAge: 90000, httpOnly: true});
        res.redirect('/login');
    }
    static async login(req: any, res: Response){
        const user: User | null = await UserService.getUser(req.body);
        if(user){
            req.session.regenerate(function (err: any) {
                if (err) {
                    console.log(err);
                    return;
                }
                // store user information in session, typically a user id
                req.session.userLogin = user;
                req.session.userId = user.id;
                
                // save the session before redirection to ensure page
                // load does not happen before session is saved
                req.session.save(function (err: any) {
                    if (err) return;
                    // if (req.session.role.id !==1) {
                    //     res.redirect('/admin'); // -> call http://localhost:3000/admin method: Get
                    //     return;
                    // }
                    const role: any = user.role;
                    role?.id ===1 ? res.redirect('/admin') : res.redirect('/home');
                })
              })
        }else {
            res.cookie('errorLogin', 'Invalid email or password', { maxAge: 1000, httpOnly: true });
            res.redirect('/login');
        }
    }
    static async logout(req: any, res: Response){
        // req.session.user = null
        res.clearCookie('email');
        req.session.save(function (err: any) {
        if (err) return;

        req.session.regenerate(function (err: any) {
        if (err) return;
        res.redirect('/login')
        })
    })   
    }
}
export default HomeController
import { Request, Response } from "express";
import UserService from "@services/userService";
import ProductService from "@services/prodcutService";
import { User } from "@entity/User";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/authMiddleware";
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
        const product = await ProductService.getAllProducts();
        res.render('home/home.ejs', { product: product});
    }
    static async showCart(req: Request, res: Response){

        res.render('home/cart',);
    }

    static async addCart(req: AuthRequest, res: Response){
        const productId = Number(req.query.id);
        const product = await ProductService.getProductById(productId);
        const user = req.user;
        const carts= {
            nameAccount: user?.userName,
            email: user?.userEmail,
            productName: product?.name,
            quantity: 1,
            price: product?.price,
            image: product?.image,
            isPayment: false
        }
        UserService.createCarts(carts);
        res.render('home/cart',);
    }

    static async showCheckout(req: Request, res: Response){
        res.render('home/checkout',);
    }
    static async showDetail(req: Request, res: Response){
        const productId = Number(req.params.id);
        const product = await ProductService.getProductById(productId);
        res.render('home/detail', { product: product });
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
        const error = false;
        res.render('auths/register',{error});
    }
//POST
    static async register(req: Request, res: Response){
        
        try {
            UserService.createUser(req.body);
            res.cookie('email', req.body.email ,{maxAge: 90000, httpOnly: true});
            res.redirect('/login');
          }catch (error: any) {
            res.render('auths/register', {
              error: error.message,
            });
        }
    }
    static async login(req: Request, res: Response) {
        const user = await UserService.getUser(req.body);
        console.log(user)
        if (user) {
            const token = jwt.sign(
                { userId: user.id,userName: user.fullName,userEmail: user.email, role: user.role }, 
                "your_secret_key",
                { expiresIn: "1h" }
            );
            
    
            res.cookie('auth_token', token, { httpOnly: true, maxAge: 3600000 });
    
            user.role?.id === 1 ? res.redirect('/admin') : res.redirect('/home');
        } else {
            res.cookie('errorLogin', 'Invalid email or password', { maxAge: 1000, httpOnly: true });
            res.redirect('/login');
        }
    }
    static async logout(req: any, res: Response) {
        res.clearCookie('auth_token', { path: '/' }); // Xóa token
        res.redirect('/login');
    }
    
}
export default HomeController
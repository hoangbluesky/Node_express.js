import express, { Express, Request,Response, Router } from "express";
import { checkAuth } from "src/middleware/checkAuth";
import authMiddleware from "src/middleware/authMiddleware";
import HomeController from "@controllers/HomeController";
const router: Router = express.Router();


router.get('/home',authMiddleware, (req: Request, res: Response) => { // -> localhost:3000/home
    HomeController.showHome(req,res);
});
router.get('/cart',(req: Request, res: Response) => { // -> localhost:3000/home
    HomeController.showCart(req,res);
});

router.get('/addCart', (req: Request, res: Response) => { // -> localhost:3000/home
    HomeController.addCart(req,res);
});

router.get('/checkout',(req: Request, res: Response) => { // -> localhost:3000/home
    HomeController.showCheckout(req,res);
});
router.get('/home/detail/:id', checkAuth,(req: Request, res: Response) => { 
    HomeController.showDetail(req,res);
});
router.get('/shop', (req: Request, res: Response) => { // -> localhost:3000/home
    HomeController.showShop(req,res);
});


router.get('/index', (req: Request, res: Response) => {
    HomeController.showIndex(req,res);
});

export default router;


// LOGIN RESGISTER
router.get('/', (req: Request, res: Response) => {
    HomeController.showLogin(req,res);
});
router.get('/login', (req: Request, res: Response) => {
    HomeController.showLogin(req,res);
});
router.get('/register', (req: Request, res: Response) => {
    HomeController.showRegister(req,res);
});

router.get('/logout', (req: Request, res: Response) =>{
    HomeController.logout(req,res);
});


//post
router.post('/register', (req: Request, res: Response) => {
    HomeController.register(req,res);
});

router.post('/login', (req: Request, res: Response) => {
    HomeController.login(req,res);
});
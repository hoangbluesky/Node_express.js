import express, { Express, Request,Response, Router } from "express";

import HomeController from "@controllers/HomeController";
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    HomeController.showLogin(req,res);
});
router.get('/login', (req: Request, res: Response) => {
    HomeController.showLogin(req,res);
});
router.get('/register', (req: Request, res: Response) => {
    HomeController.showRegister(req,res);
});
router.get('/home', (req: Request, res: Response) => {
    HomeController.showHome(req,res);
});
router.get('/index', (req: Request, res: Response) => {
    HomeController.showIndex(req,res);
});

//post
router.post('/register', (req: Request, res: Response) => {
    HomeController.register(req,res);
});



export default router;
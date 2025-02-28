import express, { Express, Request,Response, Router } from "express";
import { upload } from './index';
import AdminController from "@controllers/AdminController";
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
    AdminController.showAdmin(req,res);
});
router.get('/create', (req: Request, res: Response) => {
    AdminController.showCategory(req,res);
});
router.get('/category', (req: Request, res: Response) => {
    AdminController.showCategory(req,res);
});

router.post('/category', (req: Request, res: Response) => {
    AdminController.createCategory(req,res);
});

router.get('/product', (req: Request, res: Response) => {
    AdminController.showProduct(req,res);
});

router.get('/createProduct',(req: Request, res: Response) => {
    AdminController.showCreateProduct(req,res);
});

router.post('/storeProduct', upload.single("image"),(req: Request, res: Response) => {
    AdminController.storeProduct(req,res);
});
router.get('/storeProduct/:id/edit',(req: Request, res: Response) => {
    AdminController.showEditProduct(req,res);
});
router.post('/storeProduct/:id/edit',upload.single('image'),(req: Request, res: Response) => {
    AdminController.editProduct(req,res);
});

router.get('/storeProduct/:id/delete',(req: Request, res: Response) => {
    AdminController.deleteProduct(req,res);
});

export default router;
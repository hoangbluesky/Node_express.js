import { Request, Response } from "express";
import ProductService from "@services/prodcutService";
class AdminController{
    index(): string {
        return 'Hello, World!';
    }
    static async showAdmin(req: Request, res: Response){
        res.render('admin/admin');
    }
    static async showCategory(req: Request, res: Response){
        const category = await ProductService.getAllCategories();
        res.render('admin/category',{category: category});
    }
    static async createCategory(req: Request, res: Response){
        try{
            const data = req.body;
            await ProductService.createCategory(data);
            return res.json({message: 'Category created successfully'});
        }
        catch(error){
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    static async showProduct(req: Request, res: Response){
        const product = await ProductService.getAllProducts();
        res.render('admin/product',{product: product});
    }

    static async showCreateProduct(req: Request, res: Response) {
        const category = await ProductService.getAllCategories();
        res.render('admin/createProduct',{category: category});
    }
    
    static async storeProduct(req: Request, res: Response){
        try{
            const data = req.body;
            if (!req.file) {
                return res.status(400).json({ error: "No file uploaded" });
            }
            data.image = req.file.filename;

            await ProductService.storeProduct(data);
            res.redirect('/admin/product');
        }
        catch(error){
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
    static async showEditProduct(req: Request, res: Response){
        const id: number = Number(req.params.id);
        const product = await ProductService.getProductById(id);
        const category = await ProductService.getAllCategories();
        res.render('admin/editProduct',{product: product, category: category});
    }
    
    static async editProduct(req: Request, res: Response){
        try{
            const data = req.body;
            if (req.file) {
                data.image = req.file.filename;
                await ProductService.deleteImage(Number(data.id));
            }
            await ProductService.editProduct(data,Number(data.id));
            res.redirect('/admin/product');
        }
        catch(error){
            console.log(error);
            res.status(500).send('Server Error');
        }
    }
    static async deleteProduct(req: Request, res: Response) {
        try {
            const id: number = Number(req.params.id);
            await ProductService.deleteProduct(id);
            res.redirect('/admin/product');
        } catch (error) {
            console.log(error);
            res.status(500).send('Server Error');
        }
    }

    static async showCart(req: Request, res: Response) {
        res.render('admin/cart');
    }
}
export default AdminController
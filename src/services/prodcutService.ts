import { AppDataSource } from "@databases/data-source";
import Product from "@entity/Product";
import Category from "@entity/Category";
import { promises as fs } from "fs";
const ProductRepository = AppDataSource.getRepository(Product);
const CategoryRepository = AppDataSource.getRepository(Category);

class ProductService {

    static async getAllCategories(): Promise<Category[]> {
        const data: any = await CategoryRepository.find();
        return data;
    }
    
    static async createCategory(category: any) {
        const newCategory = new Category();
        newCategory.nameCategory = category.name;
        // them o day
        return await CategoryRepository.save(newCategory);
    }

    static async getAllProducts(): Promise<Product[]> {
        const data = await ProductRepository.find({ relations: ["category"] });
        return data;
    }

    static async storeProduct(data: any) {
        const {name, price,image, description, stock, categoryId} = data;
        const newProduct = new Product();
        newProduct.name = name;
        newProduct.price = price;
        newProduct.image = image;
        newProduct.description = description;
        newProduct.stock = stock;
        newProduct.category = categoryId;
        // them o day
        return await ProductRepository.save(newProduct);
    }
    static async getProductById(id: number){
        return await ProductRepository.findOne({
            where: { id },
            relations: ["category"]
        });
        
    }
    static async unlinkFile(filePath: string): Promise<void> {
        await fs.unlink(filePath);
    }
    static async deleteImage(id: number) {
        const product = await ProductService.getProductById(id);
        const imagePath = "./src/public/images/" + product?.image;
        await ProductService.unlinkFile(imagePath);
    }
    static async deleteProduct(id: number){
        await ProductService.deleteImage(id);
        await ProductRepository.delete(id);
    }
    static async editProduct(data: any, id:any){
        const product = await ProductRepository.findOne({where: { id}});
        
        if (!product) throw new Error("Product not found");
        await ProductRepository.update(id, {
            name: data.name,
            price: data.price,
            image: data?.image??product.image,
            description: data.description,
            stock: data.stock,
            category: data.categoryId,
        });
    }
    
}
export default ProductService
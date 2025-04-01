import { AppDataSource } from "@databases/data-source";
import User from "@entity/User";
import Role from "@entity/Role";
import Cart from "@entity/Cart";
const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);
const cartRepository = AppDataSource.getRepository(Cart);

class UserService {
    static async getAllUsers(): Promise<User[]> {
        const data: any = await userRepository.find();
        return data;
    }

    static async createUser(data: any) {
        const { fullName, email, password, isActive } = data;
    
        try {
            console.log('Creating user with data:', data);
    
            const existingUser = await userRepository.findOne({ where: { email } });
            if (existingUser) {
                throw new Error('Email đã tồn tại');
            }
    
            const newUser = new User();
            newUser.fullName = fullName;
            newUser.email = email;
            newUser.password = password;
            newUser.isActive = isActive ? isActive : false;
    
            const roleUser = await roleRepository.findOne({ where: { id: 2 } });
            newUser.role = roleUser || undefined;
    
            const savedUser = await userRepository.save(newUser);
    
            return savedUser;
        } catch (error) {
            throw error;
        }
    }

    static async getUser(data: any): Promise<User | null> {
        const {email, password} = data;
        return await userRepository.findOne({
            where: {
                email: email,
                password: password,
            },
            relations: ['role'],
        });
    }
    static async createCarts(cartData: Cart): Promise<Cart> {
        try {
            const cart = cartRepository.create(cartData);
            const savedCart = await cartRepository.save(cart);
            return savedCart;
        } catch (error) {
            console.error("Error creating cart:", error);
            throw new Error("Failed to create cart");
        }
    }
    // static async createCarts(cartData: Cart): Promise<Cart> {
    //     try {
    //         // Kiểm tra xem giỏ hàng của người dùng đã tồn tại chưa
    //         let existingCart = await cartRepository.findOne({
    //             where: { user_id: cartData.user_id, product_id: cartData.product_id }
    //         });
    
    //         if (existingCart) {
    //             // Nếu sản phẩm đã tồn tại trong giỏ hàng, tăng số lượng
    //             existingCart.quantity += cartData.quantity;
    //             const updatedCart = await cartRepository.save(existingCart);
    //             console.log("Cart updated successfully:", updatedCart);
    //             return updatedCart;
    //         } else {
    //             // Nếu sản phẩm chưa có trong giỏ hàng, tạo mới
    //             const newCart = cartRepository.create(cartData);
    //             const savedCart = await cartRepository.save(newCart);
    //             console.log("Cart created successfully:", savedCart);
    //             return savedCart;
    //         }
    //     } catch (error) {
    //         console.error("Error creating or updating cart:", error);
    //         throw new Error("Failed to create or update cart");
    //     }
    // }
    
}
export default UserService;
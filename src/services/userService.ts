import { AppDataSource } from "@databases/data-source";
import User from "@entity/User";
import Role from "@entity/Role";
const userRepository = AppDataSource.getRepository(User);
const roleRepository = AppDataSource.getRepository(Role);

class UserService {
    static async getAllUsers(): Promise<User[]> {
        const data: any = await userRepository.find();
        return data;
    }

    static async createUser(data: any) {
        const {fullName, email, password,isActive} = data;
        const newUser = new User();
        newUser.fullName = fullName;
        newUser.email = email;
        newUser.password = password;
        newUser.isActive = isActive ? isActive : false;

        const roleUser = await roleRepository.findOne({ where: { id: 2 } });
        newUser.role = roleUser || undefined;
        return await userRepository.save(newUser);
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
}
export default UserService;
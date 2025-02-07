import { User } from "@entity/User";
import { AppDataSource } from "@databases/data-source";
const userRepository = AppDataSource.getRepository(User);

class UserService {
    static async getAllUsers(): Promise<User[]> {
        const data: any = await userRepository.find();
        return data;
    }

    static async createUser(data: any) {
        const {fullName, email, password} = data;
        const newUser = new User();
        newUser.fullName = fullName;
        newUser.email = email;
        newUser.password = password;
        newUser.isActive = true;
        return await userRepository.save(newUser);
    }
}
export default UserService;
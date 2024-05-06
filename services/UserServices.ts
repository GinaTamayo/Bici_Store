import UserRepository from '../repositories/UserRepository';
import User from '../Dto/UserDto';
import generateHash from '../Helpers/generateHash';

class UserService {
    
    static async register(user: User) {
        user.password = await generateHash(user.password);
        return  await UserRepository.add(user);
    }
}

export default UserService;
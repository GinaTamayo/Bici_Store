/*import UserRepository from '../repositories/UserRepository';
import Auth from '../Dto/AuthDto';
import createToken from '../Helpers/generateToken';
import bcrypt from 'bcryptjs';

class AuthService {
    static async login(auth: Auth) {
        const { email, password } = auth;
        const result = await UserRepository.auth(email);
        if (result.length > 0) {
            const storedPassword = result[0].password;
            const isPasswordValid = await bcrypt.compare(password, storedPassword);
            if (isPasswordValid) {
                const token = createToken(email);
                return { accessToken: token };
            }
        }
        throw new Error('Incorrect username or password');
    }
}

export default AuthService;*/

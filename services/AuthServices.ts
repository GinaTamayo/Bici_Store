import UserRepository from '../repositories/UserRepository';
import Auth from '../Dto/AuthDto';
import createToken from '../Helpers/generateToken';
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";


dotenv.config();

class AuthService {
    static async login(auth: Auth) {
        const { email, password } = auth;
        const result: any = await UserRepository.auth(auth);
        if (result[0].length > 0) {
            const isPasswordValid = await bcrypt.compare(password, result[0][0].password);
            if (isPasswordValid) {
                const token = createToken({email: auth.email}, process.env.JWT_SECRET, 30);
                return token;
            }
        }
        throw new Error('Incorrect username or password');
    }
}

export default AuthService;
import UserRepository from '../repositories/UserRepository';
import Profile from '../Dto/ProfileDto';
import validateToken from '../middleware/middlewareToken';

class ProfileService {
    static async updateProfile(profile: Profile, token: string) {
        try {
            const isCorrectToken = validateToken(token);
            return await UserRepository.updateProfile(profile);
        } catch (error) {
            throw error;
        }
    }
}

export default ProfileService;
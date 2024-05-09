import UserRepository from '../repositories/UserRepository';
import Profile from '../Dto/ProfileDto';

class ProfileService {
    static async updateProfile(profile: Profile) {
        try {
            return await UserRepository.updateProfile(profile);
        } catch (error) {
            throw error;
        }
    }
}

export default ProfileService;



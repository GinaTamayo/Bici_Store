import UserRepository from '../repositories/UserRepository';
import Profile from '../Dto/ProfileDto';

class ProfileService {
    static async updateProfile(profile: Profile) {
        const {numeroDocumento, nombre, apellido, telefono, numeroDocumentoAntiguo} = profile;
        return await UserRepository.updateProfile(profile);
    }
}

export default ProfileService;
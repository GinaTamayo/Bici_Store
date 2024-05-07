import db from '../config/config-db';
import User from '../Dto/UserDto';
import Auth from '../Dto/AuthDto';
import Profile from '../Dto/ProfileDto';

class UserRepository {

    static async add(user: User){
        const sql = 'INSERT INTO users (numeroDocumento, nombre, apellido, telefono, email, password) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [user.numeroDocumento, user.nombre, user.apellido, user.telefono, user.email, user.password];
        return await db.execute(sql, values);
    }

    static async auth(auth: Auth){
        const sql = 'SELECT password FROM users WHERE email=?';
        const values: Array<string> = [auth.email];
        return await db.execute(sql, values);
    }

    static async updateProfile(profile: Profile){
        const sql = 'UPDATE users SET numeroDocumento = ?, nombre = ?, apellido = ?, telefono = ? WHERE numeroDocumento = ?';
        const values = [profile.numeroDocumento, profile.nombre, profile.apellido, profile.telefono, profile.numeroDocumentoAntiguo];
        return await db.execute(sql, values);
    }
}


export default UserRepository;
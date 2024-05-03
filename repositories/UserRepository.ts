import db from '../config/config-db';
import User from '../Dto/UserDto';

class UserRepository {

    static async add(user: User){
        const sql = 'INSERT INTO users (numeroDocumento, nombre, apellido, telefono, email, password) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [user.numeroDocumento, user.nombre, user.apellido, user.telefono, user.email, user.password];
        return db.execute(sql, values);
    }

    static async auth(email: string, password: string){
        const sql = 'SELECT password FROM users WHERE email=?';
        const values: Array<string> = [email];
        return db.execute(sql, values);
    }

    static async updateProfile(numeroDocumento: string, nombre: string, apellido: string, telefono: string, numeroDocumentoAntiguo: string){
        const sql = 'UPDATE users SET numeroDocumento = ?, nombre = ?, apellido = ?, telefono = ? WHERE numeroDocumento = ?';
        const values = [numeroDocumento, nombre, apellido, telefono, numeroDocumento, numeroDocumentoAntiguo];
        return db.execute(sql, values);
    }
}


export default UserRepository;
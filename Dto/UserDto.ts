class User {
    numeroDocumento: string;
    nombre: string;
    apellido: string;
    telefono: string;
    email: string;
    password: string;
    constructor(
        numeroDocumento: string, nombre: string, apellido: string, telefono: string, email: string, password: string
    ) {
        this.numeroDocumento = numeroDocumento;
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.telefono = telefono;
        this.password = password;
    }
}

export default User;
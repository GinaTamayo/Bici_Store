class User {
    private _numeroDocumento: string;
    private _nombre: string;
    private _apellido: string;
    private _telefono: string;
    private _email: string;
    private _password: string;
    constructor(
        numeroDocumento: string, 
        nombre: string, 
        apellido: string, 
        telefono: string, 
        email: string, 
        password: string
    ) {
        this._numeroDocumento = numeroDocumento;
        this._nombre = nombre;
        this._apellido = apellido;
        this._telefono = telefono;
        this._email = email;
        this._password = password;
    }

    
    public get numeroDocumento() : string {
        return this._numeroDocumento;
    }

    public get nombre() : string {
        return this._nombre;
    }

    public get apellido() : string {
        return this._apellido;
    }
    
    public get telefono() : string {
        return this._telefono;
    }
    
    public get email() : string {
        return this._email;
    }
    
    public get password() : string {
        return this._password;
    }
    


    
    public set numeroDocumento(numeroDocumento : string) {
        this._numeroDocumento = numeroDocumento;
    }
    
    public set nombre(nombre : string) {
        this._nombre = nombre;
    }

    
    public set apellido(apellido : string) {
        this._apellido = apellido;
    }
    
    public set telefono(telefono : string) {
        this._telefono = telefono;
    }
    
    public set email(email : string) {
        this._email = email;
    }
    
    public set password(password : string) {
        this._password = password;
    }
}

export default User;
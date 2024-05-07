class Auth {
    private _email: string;
    private _password: string;

    constructor(
        email: string, 
        password: string
    ) {
        this._email = email;
        this._password = password;
    }

    
    public get email() : string {
        return this._email;
    }
    
    public get password() : string {
        return this._password;
    }
    

    
    public set email(email : string) {
        this._email = email;
    }
    
    public set password(password : string) {
        this._password = password;
    }
}

export default Auth;
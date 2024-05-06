class Profile {
    private _numeroDocumento: string;
    private _nombre: string;
    private _apellido: string;
    private _telefono: string;
    private _numeroDocumentoAntiguo: string;

    constructor(
        numeroDocumento: string, 
        nombre: string, 
        apellido: string, 
        telefono: string, 
        numeroDocumentoAntiguo: string, 
    ) {
        this._numeroDocumento = numeroDocumento;
        this._nombre = nombre;
        this._apellido = apellido;
        this._telefono = telefono;
        this._numeroDocumentoAntiguo = numeroDocumentoAntiguo;
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

    public get numeroDocumentoAntiguo() : string {
        return this._numeroDocumentoAntiguo;
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

    public set numeroDocumentoAntiguo(numeroDocumentoAntiguo : string) {
        this._numeroDocumentoAntiguo = numeroDocumentoAntiguo;
    }
}

export default Profile;



function validarCorreo(correo: string): boolean {
    // Expresión regular para validar el formato del correo electrónico
    const regexCorreo: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
}


export default validarCorreo;
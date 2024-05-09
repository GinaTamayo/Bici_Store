function validarCorreo(correo: string): boolean {

    const regexCorreo: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regexCorreo.test(correo);
}

export default validarCorreo;
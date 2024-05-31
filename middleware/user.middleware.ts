import { check } from 'express-validator';
class validateUser {
    static validateRegister = [
        check('numeroDocumento').exists().notEmpty().withMessage('El número de documento es requerido')
        .isNumeric().withMessage('El número de documento debe contener solo números'),
      
        check('nombre').exists().notEmpty().withMessage('El nombre es requerido'),
        check('apellido').exists().notEmpty().withMessage('El apellido es requerido'),
        check('telefono').exists().notEmpty().withMessage('El teléfono es requerido')
        .isNumeric().withMessage('El número de telefono debe contener solo números'),
        check('email').exists().isEmail().withMessage('El email no es válido'),
        check('password')
          .isLength({ min: 8, max: 15 }).withMessage('La contraseña debe tener entre 8 y 15 caracteres')
          .matches(/[A-Z]/).withMessage('La contraseña debe contener al menos una letra mayúscula')
          .matches(/[a-z]/).withMessage('La contraseña debe contener al menos una letra minúscula')
          .matches(/\d/).withMessage('La contraseña debe contener al menos un número')
          .custom((value, { req }) => value == req.body.confirmPassword).withMessage('Las contraseñas no coinciden')
      ];

      static validarteAuth = [
        check('email').exists().isEmail().withMessage('El email no es válido'),
      ];

      static validateUpdateUser = [
        check('numeroDocumento').exists().notEmpty().withMessage('El número de documento es requerido')
        .isNumeric().withMessage('El número de documento debe contener solo números'),
        check('nombre').exists().notEmpty().withMessage('El nombre es requerido'),
        check('apellido').exists().notEmpty().withMessage('El apellido es requerido'),
        check('telefono').exists().notEmpty().withMessage('El teléfono es requerido')
        .isNumeric().withMessage('El número de telefono debe contener solo números'),
        check('numeroDocumentoAntiguo').exists().notEmpty().withMessage('El número de documento anterior es requerido')
        .isNumeric().withMessage('El número de documento debe contener solo números'),
      ]
}


export default validateUser;





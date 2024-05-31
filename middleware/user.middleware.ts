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




/*DROP DATABASE IF EXISTS clinicaVeterinaria;

CREATE DATABASE clinicaVeterinaria;
USE clinicaVeterinaria;

CREATE TABLE IF NOT EXISTS administrador (
    IdAdministrador VARCHAR(12) NOT NULL,
    nombreAdministrador VARCHAR(50) NOT NULL,
    apellidoAdministrador VARCHAR(50) NOT NULL,
    correoAdministrador VARCHAR(50) NOT NULL UNIQUE,
    contrasenaAdministrador VARCHAR(150) NOT NULL,
    rol ENUM('administrador') DEFAULT 'administrador' NULL,
    PRIMARY KEY (IdAdministrador),
    INDEX idx_correoAdmin (correoAdministrador)
) ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS usuario (
    IdUsuario VARCHAR(12) NOT NULL,
    nombreUsuario VARCHAR(50) NOT NULL,
    apellidoUsuario VARCHAR(50) NOT NULL,
    correoUsuario VARCHAR(50) NOT NULL UNIQUE,
    contrasenaUsuario VARCHAR(150) NOT NULL,
    rol ENUM('usuario') DEFAULT 'usuario' NULL,
    PRIMARY KEY (IdUsuario),
    INDEX idx_correoUsuario (correoUsuario)
) ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS veterinario (
    IdVeterinario VARCHAR(12) NOT NULL,
    IdAdministrador VARCHAR(12) NOT NULL,
    nombreVeterinario VARCHAR(50) NOT NULL,
    apellidoVeterinario VARCHAR(50) NOT NULL,
    correoVeterinario VARCHAR(50) NOT NULL UNIQUE,
    contrasenaVeterinario VARCHAR(150) NOT NULL,
    rol ENUM('veterinario') DEFAULT 'veterinario' NULL,
    PRIMARY KEY (IdVeterinario),
    FOREIGN KEY (IdAdministrador) REFERENCES administrador(IdAdministrador) ON DELETE CASCADE,
    INDEX idx_correoVet (correoVeterinario)
) ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS cita (
    IdCita INT AUTO_INCREMENT UNIQUE,
    IdUsuario VARCHAR(12) NOT NULL,
    IdVeterinario VARCHAR(12) NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    numeroTelefonoUsuario VARCHAR(15) NOT NULL,
    nombreMascota VARCHAR(30) NOT NULL,
    edadMascota INT,
    estadoVacunacion ENUM('vacunado', 'no vacunado') NOT NULL,
    especie VARCHAR(30) NOT NULL,
    raza VARCHAR(30) NOT NULL,
    motivoConsulta VARCHAR(200) NOT NULL,
    PRIMARY KEY (IdCita),
    FOREIGN KEY (IdUsuario) REFERENCES usuario(IdUsuario) ON DELETE CASCADE,
    FOREIGN KEY (IdVeterinario) REFERENCES veterinario(IdVeterinario) ON DELETE CASCADE,
    INDEX idx_fecha (fecha),
    INDEX idx_IdUsuario (IdUsuario),
    INDEX idx_IdVeterinario (IdVeterinario)
) ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS factura (
    IdFactura INT AUTO_INCREMENT UNIQUE,
    IdCita INT NOT NULL,
    fecha DATE NOT NULL,
    hora TIME NOT NULL,
    total DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY (IdFactura),
    FOREIGN KEY (IdCita) REFERENCES cita(IdCita) ON DELETE CASCADE,
    INDEX idx_IdCita (IdCita)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS producto (
    IdProducto INT AUTO_INCREMENT UNIQUE,
    imagen VARCHAR(300) NOT NULL,
    nombreProducto VARCHAR(30) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    precio DECIMAL(10, 2) NOT NULL,
    stock INT NOT NULL,
    PRIMARY KEY (IdProducto)
) ENGINE = InnoDB;


CREATE TABLE IF NOT EXISTS usuarioProducto (
    IdUsuarioProducto INT AUTO_INCREMENT UNIQUE,
    IdUsuario VARCHAR(12) NOT NULL,
    IdProducto INT NOT NULL,
    cantidad INT NOT NULL,
    total DECIMAL(10, 2),
    PRIMARY KEY (IdUsuarioProducto),
    FOREIGN KEY (IdUsuario) REFERENCES usuario(IdUsuario) ON DELETE CASCADE,
    FOREIGN KEY (IdProducto) REFERENCES producto(IdProducto) ON DELETE CASCADE,
    INDEX idx_IdUsuario (IdUsuario),
    INDEX idx_IdProducto (IdProducto)
) ENGINE = InnoDB;



CREATE TABLE IF NOT EXISTS historialCita (
    IdHistorial INT AUTO_INCREMENT UNIQUE,
    IdVeterinario VARCHAR(12) NOT NULL,
    IdUsuario VARCHAR(12) NOT NULL,
    fecha DATE NOT NULL,
    descripcion VARCHAR(200) NOT NULL,
    PRIMARY KEY (IdHistorial),
    FOREIGN KEY (IdVeterinario) REFERENCES veterinario(IdVeterinario) ON DELETE CASCADE,
    FOREIGN KEY (IdUsuario) REFERENCES usuario(IdUsuario) ON DELETE CASCADE,
    INDEX idx_IdVeterinario (IdVeterinario),
    INDEX idx_IdUsuario (IdUsuario)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS adopcionMascota (
    IdAdopcionMascota INT AUTO_INCREMENT UNIQUE,
    IdUsuario VARCHAR(12),
    imagenMascota VARCHAR(300) NOT NULL,
    nombreMascota VARCHAR(20) NOT NULL,
    edadMascota INT NOT NULL,
    especieMascota VARCHAR(15) NOT NULL,
    razaMascota VARCHAR(15) NOT NULL,
    esterilizacionMascota ENUM('SI', 'NO') NOT NULL,
    estadoVacunacionMascota ENUM('vacunado', 'no vacunado') NOT NULL,
    PRIMARY KEY (IdAdopcionMascota),
    FOREIGN KEY (IdUsuario) REFERENCES usuario(IdUsuario) ON DELETE CASCADE,
    INDEX idx_IdUsuario (IdUsuario)
) ENGINE = InnoDB;



CREATE INDEX idx_nombreUsuario ON usuario (nombreUsuario);
CREATE INDEX idx_apellidoUsuario ON usuario(apellidoUsuario);
CREATE INDEX idx_nombreVeterinario ON veterinario(nombreVeterinario);
CREATE INDEX idx_apellidoVeterinario ON veterinario(apellidoVeterinario);
CREATE INDEX idx_nombreProducto ON producto(nombreProducto);
CREATE INDEX idx_precio ON producto(precio);
CREATE INDEX idx_nombreMascota_adopcion ON adopcionMascota(nombreMascota);
CREATE INDEX idx_especieMascota_adopcion ON adopcionMascota(especieMascota);
CREATE INDEX idx_razaMascota_adopcion ON adopcionMascota(razaMascota);

-- Procedimientos alamacenados y triggers --
DELIMITER //

CREATE PROCEDURE InsertarAdministrador (
    IN p_IdAdministrador VARCHAR(12),
    IN p_nombreAdministrador VARCHAR(50),
    IN p_apellidoAdministrador VARCHAR(50),
    IN p_correoAdministrador VARCHAR(50),
    IN p_contrasenaAdministrador VARCHAR(150)
)
BEGIN
    INSERT INTO administrador (IdAdministrador, nombreAdministrador, apellidoAdministrador, correoAdministrador, contrasenaAdministrador)
    VALUES (p_IdAdministrador, p_nombreAdministrador, p_apellidoAdministrador, p_correoAdministrador, p_contrasenaAdministrador);
END //

CREATE PROCEDURE ObtenerAdministradores()
BEGIN
    SELECT * FROM administrador;
END //

CREATE PROCEDURE ActualizarAdministrador (
    IN p_IdAdministrador VARCHAR(12),
    IN p_nombreAdministrador VARCHAR(50),
    IN p_apellidoAdministrador VARCHAR(50),
    IN p_correoAdministrador VARCHAR(50),
    IN p_contrasenaAdministrador VARCHAR(150)
)
BEGIN
    UPDATE administrador
    SET nombreAdministrador = p_nombreAdministrador,
        apellidoAdministrador = p_apellidoAdministrador,
        correoAdministrador = p_correoAdministrador,
        contrasenaAdministrador = p_contrasenaAdministrador
    WHERE IdAdministrador = p_IdAdministrador;
END //

CREATE PROCEDURE EliminarAdministrador (
    IN p_IdAdministrador VARCHAR(12)
)
BEGIN
    DELETE FROM administrador
    WHERE IdAdministrador = p_IdAdministrador;
END //

DELIMITER ;

CALL InsertarAdministrador('001', 'Juan', 'Perez', 'juan@example.com', 'contraseña123');
CALL ObtenerAdministradores();

CALL ActualizarAdministrador('001', 'Juanito', 'Perez', 'juanito@example.com', 'nuevacontraseña');
CALL ObtenerAdministradores();

CALL EliminarAdministrador('001');
CALL ObtenerAdministradores();



/Usuario/
DELIMITER //

CREATE PROCEDURE InsertarUsuario (
    IN p_IdUsuario VARCHAR(12),
    IN p_nombreUsuario VARCHAR(50),
    IN p_apellidoUsuario VARCHAR(50),
    IN p_correoUsuario VARCHAR(50),
    IN p_contrasenaUsuario VARCHAR(150)
)
BEGIN
    INSERT INTO usuario (IdUsuario, nombreUsuario, apellidoUsuario, correoUsuario, contrasenaUsuario)
    VALUES (p_IdUsuario, p_nombreUsuario, p_apellidoUsuario, p_correoUsuario, p_contrasenaUsuario);
END //

CREATE PROCEDURE ObtenerUsuarios()
BEGIN
    SELECT * FROM usuario;
END //

CREATE PROCEDURE ActualizarUsuario (
    IN p_IdUsuario VARCHAR(12),
    IN p_nombreUsuario VARCHAR(50),
    IN p_apellidoUsuario VARCHAR(50),
    IN p_correoUsuario VARCHAR(50),
    IN p_contrasenaUsuario VARCHAR(150)
)
BEGIN
    UPDATE usuario
    SET nombreUsuario = p_nombreUsuario,
        apellidoUsuario = p_apellidoUsuario,
        correoUsuario = p_correoUsuario,
        contrasenaUsuario = p_contrasenaUsuario
    WHERE IdUsuario = p_IdUsuario;
END //

CREATE PROCEDURE EliminarUsuario (
    IN p_IdUsuario VARCHAR(12)
)
BEGIN
    DELETE FROM usuario
    WHERE IdUsuario = p_IdUsuario;
END //

DELIMITER ;


CALL p_insertar_usuario2('001', 'John', 'Doe', 'john@example.com', 'password123');
CALL ObtenerUsuarios();

CALL ActualizarUsuario('001', 'John', 'Smith', 'john.smith@example.com', 'newpassword');
CALL ObtenerUsuarios();

CALL EliminarUsuario('001');
CALL ObtenerUsuarios();



/veterinario/

DELIMITER //

CREATE PROCEDURE InsertarVeterinario (
    IN p_IdVeterinario VARCHAR(12),
    IN p_IdAdministrador VARCHAR(12),
    IN p_nombreVeterinario VARCHAR(50),
    IN p_apellidoVeterinario VARCHAR(50),
    IN p_correoVeterinario VARCHAR(50),
    IN p_contrasenaVeterinario VARCHAR(150)
)
BEGIN
    INSERT INTO veterinario (IdVeterinario, IdAdministrador, nombreVeterinario, apellidoVeterinario, correoVeterinario, contrasenaVeterinario)
    VALUES (p_IdVeterinario, p_IdAdministrador, p_nombreVeterinario, p_apellidoVeterinario, p_correoVeterinario, p_contrasenaVeterinario);
END //

CREATE PROCEDURE ObtenerVeterinarios()
BEGIN
    SELECT * FROM veterinario;
END //

CREATE PROCEDURE ActualizarVeterinario (
    IN p_IdVeterinario VARCHAR(12),
    IN p_IdAdministrador VARCHAR(12),
    IN p_nombreVeterinario VARCHAR(50),
    IN p_apellidoVeterinario VARCHAR(50),
    IN p_correoVeterinario VARCHAR(50),
    IN p_contrasenaVeterinario VARCHAR(150)
)
BEGIN
    UPDATE veterinario
    SET IdAdministrador = p_IdAdministrador,
        nombreVeterinario = p_nombreVeterinario,
        apellidoVeterinario = p_apellidoVeterinario,
        correoVeterinario = p_correoVeterinario,
        contrasenaVeterinario = p_contrasenaVeterinario
    WHERE IdVeterinario = p_IdVeterinario;
END //

CREATE PROCEDURE EliminarVeterinario (
    IN p_IdVeterinario VARCHAR(12)
)
BEGIN
    DELETE FROM veterinario
    WHERE IdVeterinario = p_IdVeterinario;
END //

DELIMITER ;
CALL InsertarVeterinario('001', '001', 'Dr. Juan', 'Perez', 'juan@example.com', 'contraseña123');
CALL ObtenerVeterinarios();

CALL ActualizarVeterinario('001', '001', 'Dr. Juanito', 'Perez', 'juanito@example.com', 'nuevacontraseña');
CALL ObtenerVeterinarios();

CALL EliminarVeterinario('001');
CALL ObtenerVeterinarios();


/Cita/

DELIMITER //

CREATE PROCEDURE InsertarCita (
    IN p_IdUsuario VARCHAR(12),
    IN p_IdVeterinario VARCHAR(12),
    IN p_fecha DATE,
    IN p_hora TIME,
    IN p_numeroTelefonoUsuario VARCHAR(15),
    IN p_nombreMascota VARCHAR(30),
    IN p_edadMascota INT,
    IN p_estadoVacunacion ENUM('vacunado', 'no vacunado'),
    IN p_especie VARCHAR(30),
    IN p_raza VARCHAR(30),
    IN p_motivoConsulta VARCHAR(200)
)
BEGIN
    INSERT INTO cita (IdUsuario, IdVeterinario, fecha, hora, numeroTelefonoUsuario, nombreMascota, edadMascota, estadoVacunacion, especie, raza, motivoConsulta)
    VALUES (p_IdUsuario, p_IdVeterinario, p_fecha, p_hora, p_numeroTelefonoUsuario, p_nombreMascota, p_edadMascota, p_estadoVacunacion, p_especie, p_raza, p_motivoConsulta);
END //



CREATE PROCEDURE ObtenerCitas()
BEGIN
    SELECT * FROM cita;
END //



CREATE PROCEDURE ActualizarCita (
    IN p_IdCita INT,
    IN p_IdUsuario VARCHAR(12),
    IN p_IdVeterinario VARCHAR(12),
    IN p_fecha DATE,
    IN p_hora TIME,
    IN p_numeroTelefonoUsuario VARCHAR(15),
    IN p_nombreMascota VARCHAR(30),
    IN p_edadMascota INT,
    IN p_estadoVacunacion ENUM('vacunado', 'no vacunado'),
    IN p_especie VARCHAR(30),
    IN p_raza VARCHAR(30),
    IN p_motivoConsulta VARCHAR(200)
)
BEGIN
    UPDATE cita
    SET IdUsuario = p_IdUsuario,
        IdVeterinario = p_IdVeterinario,
        fecha = p_fecha,
        hora = p_hora,
        numeroTelefonoUsuario = p_numeroTelefonoUsuario,
        nombreMascota = p_nombreMascota,
        edadMascota = p_edadMascota,
        estadoVacunacion = p_estadoVacunacion,
        especie = p_especie,
        raza = p_raza,
        motivoConsulta = p_motivoConsulta
    WHERE IdCita = p_IdCita;
END //




CREATE PROCEDURE EliminarCita (
    IN p_IdCita INT
)
BEGIN
    DELETE FROM cita WHERE IdCita = p_IdCita;
END //

DELIMITER ;

DELIMITER //

CREATE TRIGGER before_insert_cita
BEFORE INSERT ON cita
FOR EACH ROW
BEGIN
    SET NEW.fecha_creacion = NOW();
    SET NEW.fecha_modificacion = NOW();
END //

CREATE TRIGGER before_update_cita
BEFORE UPDATE ON cita
FOR EACH ROW
BEGIN
    SET NEW.fecha_modificacion = NOW();
END //

DELIMITER ;
CALL InsertarCita('001', '001', '2024-05-27', '10:00:00', '123456789', 'Nombre de la mascota', 5, 'vacunado', 'Perro', 'Raza', 'Motivo de la consulta');
CALL ObtenerCitas();

CALL ActualizarCita(1, '001', '001', '2024-05-28', '11:00:00', '987654321', 'Nuevo nombre de la mascota', 6, 'no vacunado', 'Gato', 'Raza actualizada', 'Motivo de la consulta actualizado');
CALL ObtenerCitas();

CALL EliminarCita(1);
CALL ObtenerCitas();


/Factura/
DELIMITER //

CREATE PROCEDURE InsertarFactura (
	IN p_IdCita INT,
    IN p_fecha DATE,
    IN p_hora TIME,
    IN p_total DECIMAL(10, 2)
)
BEGIN
    INSERT INTO factura (IdCita, fecha, hora, total)
    VALUES (p_IdCita, p_fecha, p_hora, p_total);
END //

 

CREATE PROCEDURE ObtenerFactura()
BEGIN
	SELECT * FROM factura;
END //



CREATE PROCEDURE ActualizarFactura(
	IN p_IdFactura INT,
    IN p_IdCita INT,
    IN p_fecha DATE,
    IN p_hora TIME,
    IN p_total DECIMAL(10, 2)
)
BEGIN
	UPDATE factura SET IdCita = p_IdCita, fecha = p_fecha, hora = p_hora, total = p_total WHERE IdFactura = p_IdFactura;
END //

CREATE PROCEDURE EliminarFactura(
	IN p_IdFactura INT
)
BEGIN 
	DELETE FROM factura WHERE IdFactura = p_IdFactura;
END //
DELIMITER ;

-- Triggers para la tabla factura
DELIMITER //

CREATE TRIGGER before_insert_factura
BEFORE INSERT ON factura
FOR EACH ROW
BEGIN
    SET NEW.fecha_creacion = NOW();
    SET NEW.fecha_modificacion = NOW();
END //

CREATE TRIGGER before_update_factura
BEFORE UPDATE ON factura
FOR EACH ROW
BEGIN
    SET NEW.fecha_modificacion = NOW();
END //

DELIMITER ;

    
CALL InsertarFactura(2, '2024-05-27', '12:00:00', 100.00);
CALL ObtenerFactura();

CALL ActualizarFactura(1, 2, '2024-05-28', '13:00:00', 150.00);
CALL ObtenerFactura();

CALL EliminarFactura(1);
CALL ObtenerFactura();

   
/producto/

DELIMITER //
CREATE PROCEDURE InsertarProducto(
	IN p_imagen VARCHAR(300),
    IN p_nombreProducto VARCHAR(30),
    IN p_descripcion VARCHAR(100),
    IN p_precio DECIMAL(10, 2),
    IN p_stock INT
)
BEGIN 
	INSERT INTO producto (imagen, nombreProducto, descripcion, precio, stock)
    VALUES (p_imagen, p_nombreProducto, p_descripcion, p_precio, p_stock);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ObtenerProducto()
BEGIN 
	SELECT * FROM producto;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ActualizarProducto(
	IN p_IdProducto INT,
    IN p_imagen VARCHAR(300),
    IN p_nombreProducto VARCHAR(30),
    IN p_descripcion VARCHAR(100),
    IN p_precio DECIMAL(10, 2),
    IN p_stock INT
)
BEGIN 
	UPDATE producto SET imagen = p_imagen, nombreProducto = p_nombreProducto, descripcion = p_descripcion, precio = p_precio, stock = p_stock WHERE IdProducto = p_IdProducto;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarProducto(
		IN p_IdProducto INT
)
BEGIN 
	DELETE FROM producto WHERE IdProducto = p_IdProducto;
END //
DELIMITER ;

CALL InsertarProducto('ruta_imagen', 'Producto de prueba', 'Descripción del producto', 50.00, 10);
CALL ObtenerProducto();

CALL ActualizarProducto(1, 'nueva_ruta_imagen', 'Producto actualizado', 'Descripción actualizada', 75.00, 15);
CALL ObtenerProducto();

CALL EliminarProducto(1);
CALL ObtenerProducto();


/usuarioProducto/

DELIMITER //
CREATE PROCEDURE InsertarUsuarioProducto(
	IN p_IdUsuario VARCHAR(12),
    IN p_IdProducto INT,
    IN p_cantidad INT,
	IN p_total DECIMAL(10, 2)
)
BEGIN 
	INSERT INTO usuarioProducto (IdUsuario, IdProducto, cantidad, total)
    VALUES (p_IdUsuario, p_IdProducto, p_cantidad, p_total);
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ObtenerUsuarioProducto()
BEGIN 
	SELECT * FROM usuarioProducto;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER before_insert_usuario_producto
BEFORE INSERT ON usuarioProducto
FOR EACH ROW
BEGIN 
	DECLARE prod_precio DECIMAL(10.2);
    SELECT precio INTO prod_precio FROM producto WHERE IdProducto = NEW.IdProducto;
    SET NEW.total = NEW.cantidad * prod_precio;
END //
DELIMITER ;

DELIMITER //
CREATE TRIGGER before_update_usuario_producto
BEFORE UPDATE ON usuarioProducto
FOR EACH ROW
BEGIN 
	DECLARE prod_precio DECIMAL(10.2);
    SELECT precio INTO prod_precio FROM producto WHERE IdProducto = NEW.IdProducto;
    SET NEW.total = NEW.cantidad * prod_precio;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE ActualizarUsuarioProducto(
	IN p_IdUsuarioProducto INT,
    IN p_IdUsuario VARCHAR(12),
    IN p_IdProducto INT,
    IN p_cantidad INT,
    IN p_total DECIMAL(10, 2)
)
BEGIN 
	UPDATE usuarioProducto SET IdUsuario = p_IdUsuario, IdProducto = p_IdProducto, cantidad = p_cantidad, total = p_total WHERE IdUsuarioProducto = p_IdUsuarioProducto;
END //
DELIMITER ;

DELIMITER //
CREATE PROCEDURE EliminarUsuarioProducto(
	IN p_IdUsuarioProducto INT
)
BEGIN 
	DELETE FROM usuarioProducto WHERE IdUsuarioProducto = p_IdUsuarioProducto;
END //
DELIMITER ;


/HistorialCita/
DELIMITER //
CREATE PROCEDURE InsertarHistoriaClinica(
	IN p_IdVeterinario VARCHAR(12),
    IN p_IdUsuario VARCHAR(12),
    IN p_fecha DATE,
    IN p_descripcion VARCHAR(200)
)
BEGIN 
	INSERT INTO historialCita (IdVeterinario, IdUsuario, fecha, descripcion)
    VALUES (p_IdVeterinario, p_IdUsuario, p_fecha, p_descripcion);
END ;
DELIMITER ;

DELIMITER //

CREATE PROCEDURE ObtenerHistorialCitas()
BEGIN
    SELECT * FROM historialCita;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE ActualizarHistorialCita (
    IN p_IdHistorial INT,
    IN p_IdVeterinario VARCHAR(12),
    IN p_IdUsuario VARCHAR(12),
    IN p_fecha DATE,
    IN p_descripcion VARCHAR(200)
)
BEGIN
    UPDATE historialCita
    SET IdVeterinario = p_IdVeterinario,
        IdUsuario = p_IdUsuario,
        fecha = p_fecha,
        descripcion = p_descripcion
    WHERE IdHistorial = p_IdHistorial;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE EliminarHistorialCita (
    IN p_IdHistorial INT
)
BEGIN
    DELETE FROM historialCita WHERE IdHistorial = p_IdHistorial;
END //

DELIMITER ;

CALL InsertarHistoriaClinica('id_veterinario_prueba', 'id_usuario_prueba', '2024-05-27', 'Descripción del historial de la cita');
CALL ObtenerHistorialCitas();

CALL ActualizarHistorialCita(1, 'nuevo_id_veterinario', 'nuevo_id_usuario', '2024-05-28', 'Nueva descripción del historial de la cita');
CALL ObtenerHistorialCitas();

CALL EliminarHistorialCita(1);
CALL ObtenerHistorialCitas();


/Adopcion/
DELIMITER //

CREATE PROCEDURE ObtenerAdopcionMascotas()
BEGIN
    SELECT * FROM adopcionMascota;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE ActualizarAdopcionMascota (
    IN p_IdAdopcionMascota INT,
    IN p_IdUsuario VARCHAR(12),
    IN p_imagenMascota VARCHAR(300),
    IN p_nombreMascota VARCHAR(20),
    IN p_edadMascota INT,
    IN p_especieMascota VARCHAR(15),
    IN p_razaMascota VARCHAR(15),
    IN p_esterilizacionMascota ENUM('SI', 'NO'),
    IN p_estadoVacunacionMascota ENUM('vacunado', 'no vacunado')
)
BEGIN
    UPDATE adopcionMascota
    SET IdUsuario = p_IdUsuario,
        imagenMascota = p_imagenMascota,
        nombreMascota = p_nombreMascota,
        edadMascota = p_edadMascota,
        especieMascota = p_especieMascota,
        razaMascota = p_razaMascota,
        esterilizacionMascota = p_esterilizacionMascota,
        estadoVacunacionMascota = p_estadoVacunacionMascota
    WHERE IdAdopcionMascota = p_IdAdopcionMascota;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE EliminarAdopcionMascota (
    IN p_IdAdopcionMascota INT
)
BEGIN
    DELETE FROM adopcionMascota WHERE IdAdopcionMascota = p_IdAdopcionMascota;
END //

DELIMITER ;*/
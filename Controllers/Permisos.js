const Permisos = require('../Models/Permisos');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require('../Models/Users');

exports.getAllPermisos = async (req, res, next) => {

    const query_result = await Permisos.find();
    if (!query_result) {
        res.status(500).json({ success: false })
    }
    res.status(200).json({
        success: true,
        cantPermisos: query_result.length,
        data: query_result
    });

}

exports.getPermisoByNombre = async (req, res, next) => {

    console.log(req.body.nombre)

    const query_result = await Permisos.find({ nombre: req.body.nombre });
    if (!query_result) {
        res.status(500).json({ success: false })
    }
    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.getPermisoByUser = async (req, res, next) => {

    //console.log("token: " + req.body.token);
    //console.log("permiso: " + req.body.permiso);

    let jwt_error;
    try {
        const token = req.body.token;
        jwt.verify(token, 'asdjkl238989hdf8whssdf#$%$^#JRWERWR@JR#', async function (err, decoded) {
            if (err) {
                if (err.name === 'JsonWebTokenError') {
                    //console.log('Token es invalido');
                    jwt_error = 'Token es invalido';
                    res.status(206).json({
                        success: 'partial',
                        message: jwt_error,
                        codError: 'errLogin4',
                        tokenStatus: false
                    });
                }
                if (err.name === 'TokenExpiredError') {
                    //console.log('Token expirado a las ',err.expiredAt);
                    jwt_error = 'Token expirado a las ' + err.expiredAt;
                    res.status(206).json({
                        success: 'partial',
                        message: jwt_error,
                        codError: 'errLogin5',
                        tokenStatus: false
                    });
                }
            } else {
                const userInfo = await Users.findById(decoded.userId);
                if (!userInfo) {
                    res.status(500).json({ success: false })
                }
                const infoPrograma = await Permisos.find({nombre: req.body.permiso});
                if (!infoPrograma) {
                    res.status(500).json({ success: false })
                }

                console.log(infoPrograma[0])

                var tienePermisoPerfil = false;
                var tienePermisoUsuario = false;

                for (let i = 0; i < infoPrograma[0].perfiles.length; i++) {
                    console.log(i)
                    if(infoPrograma[0].perfiles[i] === userInfo.perfil) {
                        console.log('Usuario : ' + infoPrograma[0].perfiles[i] + " si tiene permiso de perfil");
                        tienePermisoPerfil = true;
                        break;
                    } else{ 
                        console.log('Usuario : ' + infoPrograma[0].perfiles[i] + " no tiene permiso de perfil");
                        tienePermisoPerfil = false;
                        //break;
                    }
                }

                for (let i = 0; i < infoPrograma[0].usuarios.length; i++) {
                    console.log(i)
                    if(infoPrograma[0].usuarios[i] === userInfo.id) {
                        console.log('Usuario : ' + infoPrograma[0].usuarios[i] + " si tiene permiso de usuario");
                        tienePermisoUsuario = true;
                        break;
                    } else{ 
                        console.log('Usuario : ' + infoPrograma[0].usuarios[i] + " no tiene permiso de usuario");
                        tienePermisoUsuario = false;
                        //break;
                    }
                }
                
                res.status(200).json({
                    success: true,
                    //userInfo: userInfo,
                    permisoPerfil: tienePermisoPerfil,
                    permisoUsuario: tienePermisoUsuario
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            success: 'false',
            message: 'Error validacion de Token a nivel codigo'
        });
    }
}
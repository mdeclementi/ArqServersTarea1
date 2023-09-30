const Users = require('../Models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getAllUsers = async (req, res, next) => {

    const query_result = await Users.find();
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.getUserByID = async (req, res, next) => {

    //console.log(req.params);

    const query_result = await Users.findById(req.params.id);
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.postCreateUser = async (req, res, next) => {

    bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new Users({
                nombre: req.body.nombre,
                puesto: req.body.puesto,
                depto: req.body.depto,
                correo: req.body.correo,
                password: hash,
                perfil: req.body.perfil
            });
            user.save()
                .then(result => {
                    res.status(200).json({
                        success: true,
                        message: 'Usuario creado exitosamente',
                        result: result
                    })
                });
        });   

}

exports.login = async (req, res, next) => {

    //console.log(req.body.correo);
    //onsole.log(req.body.password);

    if (!req.body.correo | !req.body.password) {
        return res.status(206).json({
            success: 'partial',
            message: 'Falta algun campo de credenciales',
            codError: 'errLogin1',
          });
    }

    var correo;

    try{
        correo = await Users.findOne({ correo: req.body.correo });
      } catch (err) {
        //console.log(err);
        return res.status(404).json({
          success: 'false',
        });
      }

      if(!correo | correo === '') {
        return res.status(206).json({
            success: 'partial',
            message: 'Correo invalido',
            codError: 'errLogin2',
          });
      }

      if(await bcrypt.compare(req.body.password, correo.password)) {
        const token = jwt.sign(
            { correo: correo.correo, userId: correo._id },
            'asdjkl238989hdf8whssdf#$%$^#JRWERWR@JR#',
            { expiresIn: "1h" }
          );
    
          return res.status(200).json({
            success: true,
            message: 'Usuario validado exitosamente',
            token: token
        })
      } else {
        return res.status(206).json({
            success: 'partial',
            message: 'Password incorrecto',
            codError: 'errLogin3',
          });
      }

      

  }

  exports.getTokenStatus = async (req, res, next) => {

    let jwt_error;
    try {
        const token = req.body.token;
        jwt.verify(token,'asdjkl238989hdf8whssdf#$%$^#JRWERWR@JR#', function(err, decoded) {
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
                res.status(200).json({
                    success: true,
                    message: 'Token si es valido',
                    tokenStatus: true
                })
            }
          });
    } catch (error) {
        res.status(400).json({
            success: 'false',
            message: 'Error validacion de Token a nivel codigo'
          });
    }

}

exports.getTokenOwner = async (req, res, next) => {

    //console.log(req.body);

    let jwt_error;
    try {
        const token = req.body.token;
        jwt.verify(token,'asdjkl238989hdf8whssdf#$%$^#JRWERWR@JR#', function(err, decoded) {
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
                res.status(200).json({
                    success: true,
                    message: 'Token si es valido',
                    tokenStatus: true,
                    userId: decoded.userId
                })
            }
          });
    } catch (error) {
        res.status(400).json({
            success: 'false',
            message: 'Error validacion de Token a nivel codigo'
          });
    }

}
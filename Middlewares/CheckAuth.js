const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
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
                      });
                }
                if (err.name === 'TokenExpiredError') {
                    //console.log('Token expirado a las ',err.expiredAt);
                    jwt_error = 'Token expirado a las ' + err.expiredAt;
                    res.status(206).json({
                        success: 'partial',
                        message: jwt_error,
                        codError: 'errLogin5',
                      });
                }
            } else {
                next();
            }
          });
    } catch (error) {
        res.status(400).json({
            success: 'false',
            message: 'Error validacion de Token a nivel codigo'
          });
    }
}
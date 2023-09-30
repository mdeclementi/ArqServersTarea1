const CodigosVestir = require('../Models/CodigosVestir');

exports.getAllCodigosVestir = async (req, res, next) => {

    //Si el idioma que recibimos es ES, madno a llamar solo los que sean Espanol
    if(req.body.lang === 'ES') {
        const query_result = await CodigosVestir.find({lang: 'ES'});
        if (!query_result) {
            res.status(500).json({success: false})
        }
        res.status(200).json({
            success: true,
            cuantosCodigosVestir: query_result.length,
            data: query_result
        });
    //Si el idioma que recibimos es EN, madno a llamar solo los que sean English
    } else if (req.body.lang === 'EN') {
        const query_result = await CodigosVestir.find({lang: 'EN'});
        if (!query_result) {
            res.status(500).json({success: false})
        }
        res.status(200).json({
            success: true,
            cuantosCodigosVestir: query_result.length,
            data: query_result
        });
    //Si el idioma que recibimos es cualquier otro o nada, mandamos a llamar TODO
    } else {
        const query_result = await CodigosVestir.find();
        if (!query_result) {
            res.status(500).json({success: false})
        }
        res.status(200).json({
            success: true,
            cuantosCodigosVestir: query_result.length,
            data: query_result
        });
    }

}

exports.getCodigoVestirByID = async (req, res, next) => {

    const query_result = await CodigosVestir.findById(req.params.id);
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.postCodigoVestir = async (req, res, next) => {

    let codigoVestir = new CodigosVestir({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        lang: req.body.lang
    })

    codigoVestir = await codigoVestir.save();

    if(!codigoVestir) {
        return res.status(404).send('The CodigosVestir could not be created.');
    }

    res.send(codigoVestir);

}
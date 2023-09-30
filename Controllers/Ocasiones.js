const Ocasiones = require('../Models/Ocasiones');

exports.getAllOcasiones = async (req, res, next) => {

    var lang = req.query.lang;

    const query_result = await Ocasiones.find({lang: lang}).sort({'ocasion': 1});
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.getOcasionByID = async (req, res, next) => {

    const query_result = await Ocasiones.findById(req.params.id);
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.postCreateOcasion = async (req, res, next) => {

    let ocasion = new Ocasiones({
        ocasion: req.body.ocasion,
        lang: req.body.lang
    })

    ocasion = await ocasion.save();

    if(!ocasion) {
        return res.status(404).send('The ocasion could not be created.');
    }

    res.send(ocasion);

}
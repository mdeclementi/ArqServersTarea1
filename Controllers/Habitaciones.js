const Habitaciones = require('../Models/Habitaciones');

exports.getAllHabs = async (req, res, next) => {

    const query_result = await Habitaciones.find();
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.getHabByID = async (req, res, next) => {

    const query_result = await Habitaciones.findById(req.params.id);
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.postCreateHab = async (req, res, next) => {

    let habitacion = new Habitaciones({
        num_hab: req.body.num_hab,
    })

    habitacion = await habitacion.save();

    if(!habitacion) {
        return res.status(404).send('The habitacion could not be created.');
    }

    res.send(habitacion);

}
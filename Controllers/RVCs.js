const RVCs = require('../Models/RVCs');

exports.getAllRVCs = async (req, res, next) => {

    const query_result = await RVCs.find();
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        cuantosRVCs: query_result.length,
        data: query_result
    });

}

exports.getRVCByID = async (req, res, next) => {

    const query_result = await RVCs.findById(req.params.id);
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.getRVCsByStatus = async (req, res, next) => {

    const query_result = await RVCs.find({rvc_status: req.params.status});
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        rvc_status: req.params.status,
        cuantosRVCs: query_result.length,
        data: query_result
    });

}

exports.getRVCsActivosReservables = async (req, res, next) => {

    const query_result = await RVCs.find({rvc_status: 1, rvc_show_reservas: 1});
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.postCreateRVC = async (req, res, next) => {

    let rvc = new RVCs({
        rvc_nombre: req.body.rvc_nombre,
        rvc_cod: req.body.rvc_cod,
        rvc_status: req.body.rvc_status,
        rvc_show_landing: req.body.rvc_show_landing,
        rvc_show_reservas: req.body.rvc_show_reservas,
        rvc_dias_activo: req.body.rvc_dias_activo
    })

    rvc = await rvc.save();

    if(!rvc) {
        return res.status(404).send('The RVC could not be created.');
    }

    res.send(rvc);

}

exports.postCreateRVC_old = async (req, res, next) => {

    let rvc = new RVCs({
        rvc_nombre: req.body.rvc_nombre,
        rvc_cod: req.body.rvc_cod,
        rvc_status: req.body.rvc_status
    })

    rvc = await rvc.save();

    if(!rvc) {
        return res.status(404).send('The RVC could not be created.');
    }

    res.send(rvc);

}
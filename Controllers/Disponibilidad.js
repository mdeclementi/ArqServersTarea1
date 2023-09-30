const Disponibilidad = require('../Models/Disponibilidad');
const RVCs = require('../Models/RVCs');

exports.getAllDisps = async (req, res, next) => {

    const query_result = await Disponibilidad.find().populate('id_rvc');
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        cuantosDisps: query_result.length,
        data: query_result
    });

}

exports.getDispByID = async (req, res, next) => {

    //console.log(req.params.id);

    const query_result = await Disponibilidad.findById(req.params.id).populate('id_rvc');
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.getDispRVCByFechaYPAX = async (req, res, next) => {

    var fecha = req.query.fecha;
    var pax = parseInt(req.query.pax);

    //console.log(fecha);
    //console.log(pax);

    const saberDiaSemana = new Date(fecha);
    //console.log(saberDiaSemana);
    let diaSemana = saberDiaSemana.getDay()
    //console.log(diaSemana);

    //Este Array sirve para calcular si el dia elegido a pesa de ser valido por el margen de dias,
    //es valido de que en este dia de semana, el RVC esta activo
    const arrayDias = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado',]

    diaSemana = "rvc_dias_activo."+arrayDias[diaSemana];

    //console.log(diaSemana);

    let arrayDispsdeRVC = [];

    const query_result = await RVCs.find({rvc_status: 1, rvc_show_reservas: 1}).where(diaSemana, 1).sort({'rvc_nombre': 1});

    for(let i = 0; i < query_result.length; i++) {
        const query_result2 = await Disponibilidad.find({id_rvc: query_result[i]._id, fecha: req.query.fecha,status: 1, capacidad: {$gte: pax}}).sort({'capacidad': 1}).limit(1).populate('id_rvc');
        arrayDispsdeRVC.push(...query_result2);
    }

    if (!query_result) {
        res.status(500).json({
            success: false,
        })
    }
    res.status(200).json({
        success: true,
        fecha: fecha,
        pax: pax,
        cantResults: arrayDispsdeRVC.length,
        data: arrayDispsdeRVC
    });

}

exports.getDispsByRVCFechaYPAX = async (req, res, next) => {

    var id_rvc = req.query.id_rvc
    var fecha = req.query.fecha;
    var pax = parseInt(req.query.pax);

    //console.log(id_rvc);
    //console.log(fecha);
    //console.log(pax);

    const query_result = await Disponibilidad.find({id_rvc: id_rvc, fecha: req.query.fecha,status: 1, capacidad: {$gte: pax}}).sort({turno: 1}).populate('id_rvc');

    if (!query_result) {
        res.status(500).json({
            success: false,
        })
    }
    res.status(200).json({
        success: true,
        fecha: fecha,
        pax: pax,
        cantResults: query_result.length,
        data: query_result
    });

}

exports.getDispsByRVCyFecha = async (req, res, next) => {

    console.log(req.body.rvc);
    console.log(req.body.fecha);
    
    const query_result = await Disponibilidad.find({"fecha": req.body.fecha}).where({"id_rvc": req.body.rvc}).sort({'turno': 1});
    if (!query_result) {
        res.status(500).json({success: false})
    }

    const capacidades = [];

    for(let i = 0; i < query_result.length; i++) {
        capacidades.push(query_result[i].capacidad);
    }

    const horarios = [];

    for(let i = 0; i < query_result.length; i++) {
        horarios.push(query_result[i].hora_inicio + " - " + query_result[i].hora_fin);
    }

    res.status(200).json({
        success: true,
        resultados: query_result.length,
        capacidades: capacidades,
        horarios: horarios,
        data: query_result
    });

}

exports.postCreateDisp= async (req, res, next) => {

    let disp = new Disponibilidad({
        fecha: req.body.fecha,
        turno: req.body.turno,
        inventario: req.body.inventario,
        capacidad: req.body.capacidad,
        hora_inicio: req.body.hora_inicio,
        hora_fin: req.body.hora_fin,
        status: req.body.status,
        id_rvc: req.body.id_rvc,
    })

    disp = await disp.save();

    if(!disp) {
        return res.status(404).send('The disp could not be created.');
    }

    res.send(disp);

}
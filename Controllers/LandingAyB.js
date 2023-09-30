const LandingAyB = require('../Models/LandingAyB');
const Menus = require('../Models/Menus');
const RVCs = require('../Models/RVCs');

exports.getAllLandingAyB = async (req, res, next) => {

    const query_result = await LandingAyB.find({activo: 1}).sort({orden: 1});
        if (!query_result) {
            res.status(500).json({success: false})
        }
        res.status(200).json({
            success: true,
            cuantosLandingTotal: query_result.length,
            data: query_result
        });

}

exports.getLandingsByIdioma = async (req, res, next) => {

    //console.log(req.query.lang);
    const lang = 'lang_'+req.query.lang;
    //console.log('Idioma: ', lang);

    const query_result = await RVCs.find({rvc_show_landing: 1, rvc_status: 1});
    //console.log(query_result);

    var arrayLandings = [];

    for (let i=0; i<query_result.length; i++){
        if (lang === 'lang_es') {
            var arrayLandingsTemp = await LandingAyB.find({"rvc_nombre": query_result[i]._id}).select({ "_id": 1, "titulo": 1, "lang_es": 1, "orden": 1, "imagen": 1}).sort({orden: 1}).populate('rvc_nombre');
            arrayLandings.push(...arrayLandingsTemp);
        }
        if (lang === 'lang_en') {
            var arrayLandingsTemp = await LandingAyB.find({"rvc_nombre": query_result[i]._id}).select({ "_id": 1, "titulo": 1, "lang_en": 1, "orden": 1, "imagen": 1}).sort({orden: 1}).populate('rvc_nombre');
            arrayLandings.push(...arrayLandingsTemp);
        }
    }

    if (!query_result) {
        res.status(500).json({success: false})
    }

    res.status(200).json({
        success: true,
        lang: lang,
        cantidadLandings: arrayLandings.length,
        data: arrayLandings
    });

}

exports.getLandingByIdioma_old = async (req, res, next) => {

    const query_result = await LandingAyB.find({activo: 1, lang: req.params.idioma}).sort({orden: 1});
    if (!query_result) {
        res.status(500).json({success: false})
    }

    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.getLandingByID = async (req, res, next) => {

    const query_result = await LandingAyB.findById(req.params.id).populate('rvc_nombre');

    const lang = req.query.lang;

    if (lang === 'es') {
        
        var largoTurnos = query_result.lang_es[0].turnos.length;

        for (let i = 0; i < largoTurnos; i++) {
            var menusLength = query_result.lang_es[0].turnos[i].menus.length;
            var j = 0;
            while(j < menusLength) {
                const query_result2 = await Menus.findById({_id: query_result.lang_es[0].turnos[i].menus[j].id_menu});
                query_result.lang_es[0].turnos[i].menus[j] = {nombre: query_result.lang_es[0].turnos[i].menus[j].nombre, id_menu: query_result.lang_es[0].turnos[i].menus[j].id_menu, url: query_result2.url};
                j++;
            }
        }
    }

    if (lang === 'en') {

        var largoTurnos = query_result.lang_en[0].turnos.length;

        for (let i = 0; i < largoTurnos; i++) {
            var menusLength = query_result.lang_en[0].turnos[i].menus.length;
            var j = 0;
            while(j < menusLength) {
                const query_result2 = await Menus.findById({_id: query_result.lang_en[0].turnos[i].menus[j].id_menu});
                query_result.lang_en[0].turnos[i].menus[j] = {nombre: query_result.lang_en[0].turnos[i].menus[j].nombre, id_menu: query_result.lang_en[0].turnos[i].menus[j].id_menu, url: query_result2.url};
                j++;
            }
        }
    }

    if (!query_result) {
        res.status(500).json({success: false})
    }

    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.getLandingByID_old = async (req, res, next) => {

    const query_result = await LandingAyB.findById(req.params.id);

    var largoTurnos = query_result.turnos.length;

    for (let i = 0; i < largoTurnos; i++) {
        //console.log(i)
        //console.log(query_result.turnos[i]);
        var menusLength = query_result.turnos[i].menus.length;
        //console.log(menusLength);
        var j = 0;
          while(j < menusLength) {
            //console.log(query_result.turnos[i].menus[j]);
            const query_result2 = await Menus.findById({_id: query_result.turnos[i].menus[j].id_menu});
            query_result.turnos[i].menus[j] = {nombre: query_result.turnos[i].menus[j].nombre, id_menu: query_result.turnos[i].menus[j].id_menu, url: query_result2.url};
            //console.log(query_result.turnos[i].menus[j]);
            j++;
          }
    }

    

    if (!query_result) {
        res.status(500).json({success: false})
    }

    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.postLandingAyB = async (req, res, next) => {

    const arrayTurnos = [];

    //console.log(req.body.lang_es[0])

    // for (var i = 0; i < req.body.lang_es.turnos.length; i++) {
    //     arrayTurnos.push(req.body.lang_es.turnos[i])
    //     console.log(i)
    // }

    let landing = new LandingAyB({
        rvc_nombre: req.body.rvc_nombre,
        lang_es: req.body.lang_es,
        lang_en: req.body.lang_en,
        orden: req.body.orden,
        imagen: req.body.imagen,
    })

    landing = await landing.save();

    if(!landing) {
        return res.status(404).send('The Landing could not be created.');
    }

    res.send(landing);

}

exports.postLandingAyB_old = async (req, res, next) => {

    const arrayTurnos = [];

    for (var i = 0; i < req.body.turnos.length; i++) {
        arrayTurnos.push(req.body.turnos[i])
        //console.log(i)
    }

    let landing = new LandingAyB({
        titulo: req.body.titulo,
        especialidad: req.body.especialidad,
        descripcion: req.body.descripcion,
        observaciones: req.body.observaciones,
        turnos: arrayTurnos,
        orden: req.body.orden,
        activo: req.body.activo,
        imagen: req.body.imagen,
        lang: req.body.lang
    })

    landing = await landing.save();

    if(!landing) {
        return res.status(404).send('The Landing could not be created.');
    }

    res.send(landing);

}
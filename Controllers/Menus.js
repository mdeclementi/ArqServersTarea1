const Menus = require('../Models/Menus');

exports.getAllMenus = async (req, res, next) => {

    const query_result = await Menus.find();
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        cuantosMenus: query_result.length,
        data: query_result
    });

}

exports.getMenuByID = async (req, res, next) => {

    const query_result = await Menus.findById(req.params.id);
    if (!query_result) {
        res.status(500).json({success: false})
    }
    res.status(200).json({
        success: true,
        data: query_result
    });

}

exports.postCreateMenu = async (req, res, next) => {

    let menu = new Menus({
        nombre: req.body.nombre,
        url: req.body.url,
    })

    menu = await menu.save();

    if(!menu) {
        return res.status(404).send('The menu could not be created.');
    }

    res.send(menu);

}
const dataJSON = require('../employees.json');
const Joi = require('joi');

exports.getAllEmployees = async (req, res, next) => {

    const { page, user, badges } = req.query;

    if (page === undefined && user === undefined && badges === undefined || page === "" || page === null) {
        console.log("Default ALL Employees");
        res.status(200).json({
            success: true,
            msg: "Actividad 1 - Ejercicio 1 - Devuelve TODOS los employees del JSON",
            data: dataJSON
        });
    } else if (page) {
        console.log("Query pages");
        pageHandler(res, req);
    } else if (user) {
        console.log("Query user");
        userHandler(res, req);
    } else if (badges) {
        console.log("Query badges");
        badgesHandler(res, req);
    }

};

exports.getEmployeesOldest = async (req, res, next) => {
    const arrayEmployees = dataJSON;
    arrayEmployees.sort((a, b) => a.age - b.age);

    const edades = arrayEmployees.map(empleado => empleado.age);
    const oldest = Math.max(...edades);
    //console.log(oldest);

    const ageIndexMap = {};
    let firstDuplicateAgeIndex = -1;

    for (let i = 0; i < arrayEmployees.length; i++) {
        const currentAge = arrayEmployees[i].age;
        if (ageIndexMap.hasOwnProperty(currentAge)) {
            firstDuplicateAgeIndex = ageIndexMap[currentAge];
        } else {
            ageIndexMap[currentAge] = i;
        }
    }

    if (firstDuplicateAgeIndex === -1) {
        //console.log('No hay duplciado', arrayEmployees.length);
        res.status(200).json({
            success: true,
            msg: "Actividad 1 - Ejercicio 5 - Devolverá el objeto individual correspondiente al empleado con más edad. En caso de existir más de uno, se devolverá la primera ocurrencia. NO duplicado",
            data: arrayEmployees[arrayEmployees.length - 1]
        });
    } else {
        //console.log('Si hay duplciado', arrayEmployees.length);
        res.status(200).json({
            success: true,
            msg: "Actividad 1 - Ejercicio 5 - Devolverá el objeto individual correspondiente al empleado con más edad. En caso de existir más de uno, se devolverá la primera ocurrencia. SI duplicado",
            data: arrayEmployees[firstDuplicateAgeIndex]
        });
    }
};

exports.getEmployeesName = async (req, res, next) => {

    const NAME = req.query.NAME;
    const arrayTemp = [];
    for (let i = 0; i < dataJSON.length; i++) {
        if (dataJSON[i].name === NAME) {
            console.log("nombre si se encurena");
            arrayTemp.push(dataJSON[i]);
            break;
        } else {
            console.log("nombre no se encuentra");
        }
    }

    if (arrayTemp.length > 0) {
        res.status(200).json({
            success: true,
            msg: "Actividad 1 - Ejercicio 9 - Devolverá objeto employee cuyo nombre sea igual a NAME",
            data: arrayTemp
        });
    } else {
        res.status(400).json({
            code: "not_found",
        });
    }

};

exports.postCreateEmployee = async (req, res, next) => {

    const phoneSchema = Joi.object({
        personal: Joi.string().required(),
        work: Joi.string().required(),
        ext: Joi.string().required()
    });

    const favoritesSchema = Joi.object({
        artist: Joi.string().required(),
        food: Joi.string().required()
    });

    const pointsSchema = Joi.object({
        points: Joi.number().integer().required(),
        bonus: Joi.number().integer().required()
    });

    const schema = Joi.object({
        name: Joi.string().required(),
        age: Joi.number().integer().required(),
        phone: phoneSchema.required(),
        privileges: Joi.string().required(),
        favorites: favoritesSchema.required(),
        finished: Joi.array().items(Joi.number().integer()).required(),
        badges: Joi.array().items(Joi.string()).required(),
        points: Joi.array().items(pointsSchema).required()
    });

    const dataToValidate = req.body;

    const validationResult = schema.validate(dataToValidate);

    if (validationResult.error) {
        //console.error('Validation fallida:', validationResult.error.details);
        res.status(400).json({
            success: false,
            msg: "Actividad 1 - Ejercicio 7 - Añadirá un elemento al listado en memoria del programa (se perderá cada vez que se reinicie). ",
            code: "bad_request"
        });
    } else {
        //console.log('Validation exitosa:', validationResult.value);
        dataJSON.push(dataToValidate);
        res.status(200).json({
            success: true,
            msg: "Actividad 1 - Ejercicio 7 - Añadirá un elemento al listado en memoria del programa (se perderá cada vez que se reinicie). ",
        });
    } 
    
};

function pageHandler(res, req) {
    const page = req.query.page;
    if (page === "0") {
        res.status(400).json({
            success: false,
            msg: "No se puede consultar 0 empelados",
        });
    } else if (page === "1") {
        //console.log("Devolverá los primeros 2 empleados. Del elemento 0 al elemento 1 del listado");
        const data = [];
        data.push(dataJSON[0]);
        data.push(dataJSON[1]);
        res.status(200).json({
            success: true,
            msg: "Actividad 1 - Ejercicio 2 - Devolverá los primeros 2 empleados. Del elemento 0 al elemento 1 del listado",
            data: data
        });
    } else if (page === "2") {
        //console.log("Devolverá del elemento 2 al elemento 3 del listado");
        const data = [];
        data.push(dataJSON[1]);
        data.push(dataJSON[2]);
        res.status(200).json({
            success: true,
            msg: "Actividad 1 - Ejercicio 3 - Devolverá del elemento 2 al elemento 3 del listado",
            data: dataJSON[2]
        });
    } else {
        const indexInicio = (2 * (parseInt(page, 10) - 1));
        const indexFinal = (2 * (parseInt(page, 10) - 1)) + 1;
        const data = dataJSON.slice(indexInicio, indexFinal);
        res.status(200).json({
            success: true,
            msg: "Actividad 1 - Ejercicio 4 - Devolverá del elemento (2 * (N - 1)) al (2 * (N - 1)) + 1",
            data: data
        });
    }
}

function userHandler(res, req) {
    const user = req.query.user;
    if (user === "true") {
        const arrayTemp = [];
        dataJSON.forEach(employee => {
            if (employee.privileges === "user") {
                arrayTemp.push(employee);
            }
        });
        res.status(200).json({
            success: true,
            msg: "Actividad 1 - Ejercicio 6 - Devolverá listado de employees con privileges == user",
            data: arrayTemp
        });
    } else {
        res.status(400).json({
            success: true,
            msg: "No se puede conusltar user si es FALSE"
        });
    }
}

function badgesHandler(res, req) {
    const badges = req.query.badges;
    if (badges === "black") {
        const arrayTemp = [];
        dataJSON.forEach((employee, index) => {
            console.log(index, employee.badges);
            for (let i = 0; i < employee.badges.length; i++) {
                if (employee.badges[i] === "black") {
                    console.log("black");
                    arrayTemp.push(employee);
                }
            }
        });
        res.status(200).json({
            success: true,
            msg: "Actividad 1 - Ejercicio 8 - Devolverá listado de employees que incluya black en el atributo badges",
            data: arrayTemp
        });
    } else {
        res.status(400).json({
            success: true,
            msg: "No se puede conusltar badge si no es BLACK"
        });
    }

}
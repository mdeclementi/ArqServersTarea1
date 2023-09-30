const Reservas = require('../Models/Reservas');
const RVCs = require('../Models/RVCs');
const Disponibilidad = require('../Models/Disponibilidad');
var moment = require('moment');

exports.getAllReservas = async (req, res, next) => {

  const query_result = await Reservas.find();
  if (!query_result) {
    res.status(500).json({ success: false })
  }
  res.status(200).json({
    success: true,
    cuantosMenus: query_result.length,
    data: query_result
  });

}

exports.getReservaByID = async (req, res, next) => {

  const query_result = await Reservas.findById(req.params.id);
  if (!query_result) {
    res.status(500).json({ success: false })
  }
  res.status(200).json({
    success: true,
    data: query_result
  });

}

exports.getAllReservasHoy = async (req, res, next) => {  

  var RVCsArray;

  const fechaHoy = moment().format("MM/DD/YYYY");
  //console.log("Fecha Hoy: "+fechaHoy);
  const saberDiaSemana = new Date(fechaHoy);
  //console.log(saberDiaSemana);
  let diaSemana = saberDiaSemana.getDay()
  //console.log("Dia de Semana: "+diaSemana);
  const arrayDias = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
  diaSemana = "rvc_dias_activo."+arrayDias[diaSemana];

  try {
    RVCsArray = await RVCs.find({ rvc_show_reservas: 1, rvc_status: 1 }).where(diaSemana, 1);
    //console.log(existeReservaFecha);
  } catch (err) {
    //console.log(err);
    return res.status(206).json({
      success: 'partial',
      message: 'No se pudo validar RVCs abiertos Hoy',
      codError: 'errRSV10',
      errMongoose: err
    });
  }

  let reservasArray = [];  
  var largoRVCsArray = RVCsArray.length;

  for (let i = 0; i < largoRVCsArray; i++) {
    //console.log("RVC nombre: " + RVCsArray[i].rvc_nombre + " con el ID: " + RVCsArray[i]._id);
    try {
      var reservarArrayTemp = await Reservas.find({ reserv_fecha_in: fechaHoy, id_rvc:  RVCsArray[i]._id});
      reservasArray.push(...reservarArrayTemp);
      //console.log("Valor de Reservas Temp:" + reservarArrayTemp);
    } catch (err) {
      //console.log(err);
      return res.status(206).json({
        success: 'partial',
        message: 'No se pudo obetener Reservas de Hoy',
        codError: 'errRSV11',
        errMongoose: err
      });
    }

  }

  res.status(200).json({
    success: true,
    cantRVCs: RVCsArray.length,
    RVCs: RVCsArray,
    reservas: reservasArray,
    cantReservas: reservasArray.length
  });


}

exports.getAllReservasHoyxTratamiento = async (req, res, next) => {

  var RVCsArray;

  const fechaHoy = moment().format("MM/DD/YYYY");
  //console.log("Fecha Hoy: "+fechaHoy);
  const saberDiaSemana = new Date(fechaHoy);
  //console.log(saberDiaSemana);
  let diaSemana = saberDiaSemana.getDay()
  //console.log("Dia de Semana: "+diaSemana);
  const arrayDias = ['domingo','lunes','martes','miercoles','jueves','viernes','sabado'];
  diaSemana = "rvc_dias_activo."+arrayDias[diaSemana];

  try {
    RVCsArray = await RVCs.find({ rvc_show_reservas: 1, rvc_status: 1 }).where(diaSemana, 1);
    //console.log(existeReservaFecha);
  } catch (err) {
    //console.log(err);
    return res.status(206).json({
      success: 'partial',
      message: 'No se pudo validar RVCs abiertos Hoy',
      codError: 'errRSV10',
      errMongoose: err
    });
  }

  let reservasVIPArray = [];
  let reservasCapDifArray = [];
  let reservasCompensacionArray = [];  
  let reservasRepetitivoArray = [];
  var reservasAlergiasArray = [];
  var largoRVCsArray = RVCsArray.length;

  for (let i = 0; i < largoRVCsArray; i++) {
    //console.log("RVC nombre: " + RVCsArray[i].rvc_nombre + " con el ID: " + RVCsArray[i]._id);
    try {
      var reservasVIPArrayTemp = await Reservas.find({ reserv_fecha_in: fechaHoy, id_rvc:  RVCsArray[i]._id, vip: 1});
      reservasVIPArray.push(...reservasVIPArrayTemp);
    } catch (err) {
      //console.log(err);
      return res.status(206).json({
        success: 'partial',
        message: 'No se pudo obetener Reservas de Hoy',
        codError: 'errRSV11',
        errMongoose: err
      });
    }

  }  

  for (let i = 0; i < largoRVCsArray; i++) {
    //console.log("RVC nombre: " + RVCsArray[i].rvc_nombre + " con el ID: " + RVCsArray[i]._id);
    try {
      var reservasCapDifArrayTemp = await Reservas.find({ reserv_fecha_in: fechaHoy, id_rvc:  RVCsArray[i]._id, caps_diferentes: 1});
      reservasCapDifArray.push(...reservasCapDifArrayTemp);
    } catch (err) {
      //console.log(err);
      return res.status(206).json({
        success: 'partial',
        message: 'No se pudo obetener Reservas de Hoy',
        codError: 'errRSV11',
        errMongoose: err
      });
    }

  }

  for (let i = 0; i < largoRVCsArray; i++) {
    //console.log("RVC nombre: " + RVCsArray[i].rvc_nombre + " con el ID: " + RVCsArray[i]._id);
    try {
      var reservasCompensacionArrayTemp = await Reservas.find({ reserv_fecha_in: fechaHoy, id_rvc:  RVCsArray[i]._id, compensacion: 1});
      reservasCompensacionArray.push(...reservasCompensacionArrayTemp);
    } catch (err) {
      //console.log(err);
      return res.status(206).json({
        success: 'partial',
        message: 'No se pudo obetener Reservas de Hoy',
        codError: 'errRSV11',
        errMongoose: err
      });
    }

  }

  for (let i = 0; i < largoRVCsArray; i++) {
    //console.log("RVC nombre: " + RVCsArray[i].rvc_nombre + " con el ID: " + RVCsArray[i]._id);
    try {
      var reservasRepetitivoArrayTemp = await Reservas.find({ reserv_fecha_in: fechaHoy, id_rvc:  RVCsArray[i]._id, repetitivo: 1});
      reservasRepetitivoArray.push(...reservasRepetitivoArrayTemp);
    } catch (err) {
      //console.log(err);
      return res.status(206).json({
        success: 'partial',
        message: 'No se pudo obetener Reservas de Hoy',
        codError: 'errRSV11',
        errMongoose: err
      });
    }

  }

  for (let i = 0; i < largoRVCsArray; i++) {
    //console.log("RVC nombre: " + RVCsArray[i].rvc_nombre + " con el ID: " + RVCsArray[i]._id);
    try {
      var reservasAlergiasArrayTemp = await Reservas.find({ reserv_fecha_in: fechaHoy, id_rvc:  RVCsArray[i]._id, alergias: 1});
      reservasAlergiasArray.push(...reservasAlergiasArrayTemp);
    } catch (err) {
      //console.log(err);
      return res.status(206).json({
        success: 'partial',
        message: 'No se pudo obetener Reservas de Hoy',
        codError: 'errRSV11',
        errMongoose: err
      });
    }

  }

  for (let i = 0; i < RVCsArray.length; i++) {
    //console.log(RVCsArray[i].rvc_nombre + " - " + RVCsArray[i]._id);
    var cadenaRVC = RVCsArray[i].id;
    var nombreRVC = RVCsArray[i].rvc_nombre;
    for (let i = 0; i < reservasVIPArray.length; i++) {
      var cadenaReservas = reservasVIPArray[i].id_rvc;
      //console.log(cadenaReservas)
      if(cadenaRVC === cadenaReservas){
        //console.log("match")
        reservasVIPArray[i].id_rvc = nombreRVC;
      }
    }
  }

  for (let i = 0; i < RVCsArray.length; i++) {
    //console.log(RVCsArray[i].rvc_nombre + " - " + RVCsArray[i]._id);
    var cadenaRVC = RVCsArray[i].id;
    var nombreRVC = RVCsArray[i].rvc_nombre;
    for (let i = 0; i < reservasCapDifArray.length; i++) {
      var cadenaReservas = reservasCapDifArray[i].id_rvc;
      //console.log(cadenaReservas)
      if(cadenaRVC === cadenaReservas){
        //console.log("match")
        reservasCapDifArray[i].id_rvc = nombreRVC;
      }
    }
  }

  for (let i = 0; i < RVCsArray.length; i++) {
    //console.log(RVCsArray[i].rvc_nombre + " - " + RVCsArray[i]._id);
    var cadenaRVC = RVCsArray[i].id;
    var nombreRVC = RVCsArray[i].rvc_nombre;
    for (let i = 0; i < reservasCompensacionArray.length; i++) {
      var cadenaReservas = reservasCompensacionArray[i].id_rvc;
      //console.log(cadenaReservas)
      if(cadenaRVC === cadenaReservas){
        //console.log("match")
        reservasCompensacionArray[i].id_rvc = nombreRVC;
      }
    }
  }

  for (let i = 0; i < RVCsArray.length; i++) {
    //console.log(RVCsArray[i].rvc_nombre + " - " + RVCsArray[i]._id);
    var cadenaRVC = RVCsArray[i].id;
    var nombreRVC = RVCsArray[i].rvc_nombre;
    for (let i = 0; i < reservasRepetitivoArray.length; i++) {
      var cadenaReservas = reservasRepetitivoArray[i].id_rvc;
      //console.log(cadenaReservas)
      if(cadenaRVC === cadenaReservas){
        //console.log("match")
        reservasRepetitivoArray[i].id_rvc = nombreRVC;
      }
    }
  }

  for (let i = 0; i < RVCsArray.length; i++) {
    //console.log(RVCsArray[i].rvc_nombre + " - " + RVCsArray[i]._id);
    var cadenaRVC = RVCsArray[i].id;
    var nombreRVC = RVCsArray[i].rvc_nombre;
    for (let i = 0; i < reservasAlergiasArray.length; i++) {
      var cadenaReservas = reservasAlergiasArray[i].id_rvc;
      //console.log(cadenaReservas)
      if(cadenaRVC === cadenaReservas){
        //console.log("match")
        reservasAlergiasArray[i].id_rvc = nombreRVC;
      }
    }
  }

  res.status(200).json({
    success: true,
    catVIP: reservasVIPArray.length,
    VIP: reservasVIPArray,
    cantCompensacion: reservasCompensacionArray.length,
    compensacion: reservasCompensacionArray,
    cantCaps_diferentes: reservasCapDifArray.length,
    caps_diferentes: reservasCapDifArray,
    cantRepetitivo: reservasRepetitivoArray.length,
    repetitivo: reservasRepetitivoArray,
    cantAlergias: reservasAlergiasArray.length,
    alergias: reservasAlergiasArray
  });


}

exports.postCreateReserva = async (req, res, next) => {

  var existeReservaFecha

  try {
    existeReservaFecha = await Reservas.find({ 'reserv_fecha_in': req.body.reserv_fecha_in, reserv_num_hab: req.body.reserv_num_hab, reserv_status: 1 });
    //console.log(existeReservaFecha);
  } catch (err) {
    //console.log(err);
    return res.status(206).json({
      success: 'partial',
      message: 'No se pudo validar si hay Reserva en la Fecha de In',
      codError: 'errRSV1',
      errMongoose: err
    });
  }

  if (existeReservaFecha.length > 0) {
    console.log('Ya hay Reserva con este Fecha In y esta Habitacion');
    return res.status(206).json({
      success: 'partial',
      message: 'Ya ha un Reserva con esta Fecha In y esta Hab',
      codError: 'errRSV2',
    });
  } else {
    console.log('No hay Reserva en la Fecha de In y esta Habitacion, Se peuede Reservar');
  }

  const fechaHoy = moment().format("MM/DD/YYYY");
  //console.log(fechaHoy);
  const horaHoy = moment().format("HH:mm");
  //console.log(horaHoy);

  var codRandom = Math.floor(Math.random() * (9999999 - 1) + 1);
  //console.log(codRandom);
  //console.log(req.body.id_rvc);

  var codRVC

  try {
    codRVC = await RVCs.findById(req.body.id_rvc).select({ rvc_cod: 1, rvc_nombre: 1, _id: 0 });
  } catch (err) {
    //console.log(err);
    return res.status(206).json({
      success: 'partial',
      message: 'No se encontro el RVC',
      codError: 'errRSV3',
      errMongoose: err
    });
  }

  //console.log(codRVC);

  const nombreRVC = codRVC.rvc_nombre;
  console.log('Nombre de RVC: ', nombreRVC);
  var codCompleto = codRVC.rvc_cod + "_" + codRandom;
  //console.log('Codigo de Reserva ya completo pero sin validar: ', codCompleto);

  var codReservaOK = false;

  while (codReservaOK === false) {

    var codReservExiste;

    try {
      codReservExiste = await Reservas.find({ reserv_cod: codCompleto });
    } catch (err) {
      //console.log(err);
      return res.status(206).json({
        success: 'partial',
        message: 'No se pudo buscar/encontrar los Codigos de Reserva',
        codError: 'errRSV4',
        errMongoose: err
      });
    }
    //console.log(codReservExiste);
    if (codReservExiste.length > 0) {
      //console.log('si hay reserva igual, hay que recalcular codigo');
      codRandom = Math.floor(Math.random() * (9999999 - 1) + 1);
      codCompleto = codRVC.rvc_cod + "_" + codRandom;
      //console.log('Codigo de Reserva nuevo sin validar: ', codCompleto);
    } else {
      //console.log('no hay reserva igual, no hay que recalcular codigo');
      //console.log('Codigo de Reserva ya coampelto y validado: ', codCompleto);
      codReservaOK = true;
    }
  }

  const IdDisp = req.body.id_disp;
  console.log('ID de Disponibilidad: ', IdDisp);

  var dispActual;

  try {
    dispActual = await Disponibilidad.findById(IdDisp).select({ capacidad: 1, hora_inicio: 1, _id: 0 });
  } catch (err) {
    //console.log(err);
    return res.status(206).json({
      success: 'partial',
      message: 'No se pudo buscar/encontrar la Capacidad indicada',
      codError: 'errRSV5',
      errMongoose: err
    });
  }

  console.log('Valor de dispactual: ', dispActual);

  if (!dispActual || dispActual.capacidad <= 0) {
    //console.log('no hay mas cpaciadad');
    return res.status(206).json({
      success: 'partial',
      message: 'No hay mas capacidad',
      codError: 'errRSV6'
    });

  } else {
    console.log('si hay capcaidad mayor a 0');
  }

  if (dispActual.capacidad < req.body.reserv_pax) {
    //console.log('no hay mas cpaciadad');
    return res.status(206).json({
      success: 'partial',
      message: 'Ya no hay espacio para los PAX indicados',
      codError: 'errRSV7'
    });

  } else {
    console.log('si hay capcaidad suficiente par alos PAX');
  }

  const dispPAX = req.body.reserv_pax;
  var difCapacidad = dispActual.capacidad - dispPAX;
  console.log('Valor de resta de dispActual menos reservPAX: ', difCapacidad);

  if (difCapacidad <= 0) {
    difCapacidad = 0;
    console.log('Valor de resta de disps es 0 o menos a 0, ai que se fueraza a cero: ', difCapacidad);
  }

  const reservHora = dispActual.hora_inicio;
  console.log('Hora de la Reserva: ', reservHora);

  var updateDisp;

  try {
    updateDisp = await Disponibilidad.findByIdAndUpdate(IdDisp, { capacidad: difCapacidad }, { new: true });
  } catch (err) {
    //console.log(err);
    return res.status(206).json({
      success: 'partial',
      message: 'No se pudo actuliza la Disponibilidad con la nueva Capacidad',
      codError: 'errRSV8',
      errMongoose: err
    });
  }

  //console.log(updateDisp);

  var vip;
  var CapsDiferentes;
  var compensacion;
  var repetitivo;
  var alergias;

  //console.log(req.body.caps_diferentes);

  if (req.body.vip === 0) {
    vip = 0;
  } else {
    vip = 1;
  }

  if (req.body.caps_diferentes === 0) {
    CapsDiferentes = 0;
  } else {
    CapsDiferentes = 1;
  }

  if (req.body.compensacion === 0) {
    compensacion = 0;
  } else {
    compensacion = 1;
  }

  if (req.body.repetitivo === 0) {
    repetitivo = 0;
  } else {
    repetitivo = 1;
  }

  if (req.body.alergias === 0) {
    alergias = 0;
  } else {
    alergias = 1;
  }

  let reserva = new Reservas({
    reserv_cod: codCompleto,
    reserv_nombre: req.body.reserv_nombre,
    reserv_num_hab: req.body.reserv_num_hab,
    reserv_correo: req.body.reserv_correo,
    reserv_fecha_alta: fechaHoy,
    reserv_fecha_in: req.body.reserv_fecha_in,
    reserv_hora: horaHoy,
    reserv_pax: req.body.reserv_pax,
    reserv_ocasion: req.body.reserv_ocasion,
    reserv_indicaciones: req.body.reserv_indicaciones,
    reserv_tel: req.body.reserv_tel,
    reserv_status: 1,
    lang: req.body.lang,
    id_user_alta: req.body.id_user_alta,
    id_disp: req.body.id_disp,
    id_rvc: req.body.id_rvc,
    navegadorYdispositivo: req.body.navegadorYdispositivo,
    vip: vip,
    caps_diferentes: CapsDiferentes,
    compensacion: compensacion,
    repetitivo: repetitivo,
    alergias: alergias
  });

  try {
    reserva = await reserva.save();
    // res.send(reserva);
  } catch (err) {
    //console.log(err);
    return res.status(206).json({
      success: 'partial',
      message: 'No se pudo insertar la nueva Reserva',
      codError: 'errRSV9',
      errMongoose: err
    });
  }

  const datosReserva = {
    rvc_nombre: nombreRVC,
    reserv_nombre: reserva.reserv_nombre,
    reserv_cod: reserva.reserv_cod,
    reserv_fecha_in: reserva.reserv_fecha_in,
    reserv_hora: reservHora,
    reserv_pax: reserva.reserv_pax,
    reserv_correo: reserva.reserv_correo

  }

  res.status(200).json({
    success: true,
    data: datosReserva
  });

  if (req.body.lang == 'es') {
    try {
      email_es(req.body.reserv_nombre, nombreRVC, codCompleto, req.body.reserv_fecha_in, reservHora, req.body.reserv_pax, req.body.reserv_correo);
    } catch (err) {
      console.log(err);
    }
    //console.log('ESPÑAOL');
  } else if (req.body.lang == 'en') {
    try {
      email_en(req.body.reserv_nombre, nombreRVC, codCompleto, req.body.reserv_fecha_in, reservHora, req.body.reserv_pax, req.body.reserv_correo);
    } catch (err) {
      console.log(err);
    }
    //console.log('INGLES');
  }

}

async function email_es(reserv_nombre, nombreRVC, codCompleto, reserv_fecha_in, reservHora, reserv_pax, reserv_correo) {

  const mailchimp = require("@mailchimp/mailchimp_transactional")("RYJ_h6cY1Bq7R9cb5ZICxg");
  const message = {
    from_email: "marcus@jabuticaba.com.mx",
    subject: "Hello world",
    text: "Welcome to Mailchimp Transactional!",
    to: [
      {
        email: "test@jabuticaba.com.mx",
        type: "to"
      }
    ]
  };

  const response = await mailchimp.messages.sendTemplate({
    template_name: "Confirmacion de Reserva ES",
    template_content: [
      {
        "name": "nombre",
        "content": `${reserv_nombre}`
      },
      {
        "name": "rvc",
        "content": `${nombreRVC}`
      },
      {
        "name": "cod_reserv",
        "content": `${codCompleto}`
      },
      {
        "name": "fecha_reserv",
        "content": `${reserv_fecha_in}`
      },
      {
        "name": "hora_reserv",
        "content": `${reservHora}`
      },
      {
        "name": "pax",
        "content": `${reserv_pax}`
      },
      {
        "name": "email",
        "content": `${reserv_correo}`
      }
    ],
    message: {
      from_email: "noreply@jabuticaba.com.mx",
      subject: `Reservacion ${nombreRVC} para el ${reserv_fecha_in} - ${codCompleto}`,
      to: [
        {
          email: "test@jabuticaba.com.mx",
          type: "to"
        }
      ]
    },
  });
  //console.log(response,'ESPAÑOL');
};

async function email_en(reserv_nombre, nombreRVC, codCompleto, reserv_fecha_in, reservHora, reserv_pax, reserv_correo) {

  const mailchimp = require("@mailchimp/mailchimp_transactional")("RYJ_h6cY1Bq7R9cb5ZICxg");
  const message = {
    from_email: "marcus@jabuticaba.com.mx",
    subject: "Hello world",
    text: "Welcome to Mailchimp Transactional!",
    to: [
      {
        email: "test@jabuticaba.com.mx",
        type: "to"
      }
    ]
  };

  const response = await mailchimp.messages.sendTemplate({
    template_name: "Confirmacion de Reserva EN",
    template_content: [
      {
        "name": "nombre",
        "content": `${reserv_nombre}`
      },
      {
        "name": "rvc",
        "content": `${nombreRVC}`
      },
      {
        "name": "cod_reserv",
        "content": `${codCompleto}`
      },
      {
        "name": "fecha_reserv",
        "content": `${reserv_fecha_in}`
      },
      {
        "name": "hora_reserv",
        "content": `${reservHora}`
      },
      {
        "name": "pax",
        "content": `${reserv_pax}`
      },
      {
        "name": "email",
        "content": `${reserv_correo}`
      }
    ],
    message: {
      from_email: "noreply@jabuticaba.com.mx",
      subject: `Reservation ${nombreRVC} for ${reserv_fecha_in} - ${codCompleto}`,
      to: [
        {
          email: "test@jabuticaba.com.mx",
          type: "to"
        }
      ]
    },
  });
  //console.log(response,'INGLES');
};
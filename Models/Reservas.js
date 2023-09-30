const mongoose = require('mongoose');

const ReservasSchema = mongoose.Schema({
    reserv_cod: { type: String, required: true},
    reserv_nombre: { type: String, required: true},
    reserv_num_hab: { type: Number, required: true},
    reserv_correo: { type: String, required: true},
    reserv_fecha_alta: { type: String, required: true},
    reserv_fecha_in: { type: String, required: true},
    reserv_hora: { type: String, required: true},
    reserv_pax: { type: Number, required: true},
    reserv_ocasion: { type: String, required: true},
    reserv_indicaciones: { type: String, required: false},
    reserv_tel: { type: String, required: false},
    reserv_status: { type: Number, required: true},
    lang: { type: String, required: true},
    id_user_alta: { type: String, required: true},
    id_disp: { type: String, required: true},
    id_rvc: { type: String, required: true},
    navegadorYdispositivo: { type: String, required: true},
    vip: { type: Number, default: '0', required: false},
    caps_diferentes: { type: Number, default: '0', required: false},
    compensacion: { type: Number, default: '0', required: false},
    repetitivo: { type: Number, default: '0', required: false},
    alergias: { type: Number, default: '0', required: false}
})

ReservasSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ReservasSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Reservas', ReservasSchema);
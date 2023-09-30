const mongoose = require('mongoose');

const LandingAyBSchema = mongoose.Schema({
    rvc_nombre: { type: mongoose.Schema.Types.ObjectId, ref: 'RVCs', required: true},
    lang_es: [{
        especialidad: { type: String, required: true},
        descripcion: { type: String, required: true},
        observaciones: { type: String, required: true},
        turnos: [{
            turno: { type: Number, required: true},
            nombre: { type: String, required: true},
            hora_inicio: { type: String, required: true},
            hora_fin: { type: String, required: true},
            menus: { type: Array, required: true},
            cod_vestir: { type: String, required: true},
        }],
    }],
    lang_en: [{
        especialidad: { type: String, required: true},
        descripcion: { type: String, required: true},
        observaciones: { type: String, required: true},
        turnos: [{
            turno: { type: Number, required: true},
            nombre: { type: String, required: true},
            hora_inicio: { type: String, required: true},
            hora_fin: { type: String, required: true},
            menus: { type: Array, required: true},
            cod_vestir: { type: String, required: true},
        }],
    }],
        orden: { type: Number, required: true},
        imagen: {type: String, required: true},
})

LandingAyBSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

LandingAyBSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('LandingAyB', LandingAyBSchema);
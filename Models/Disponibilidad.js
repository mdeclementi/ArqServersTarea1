const mongoose = require('mongoose');

const DisponibilidadSchema = mongoose.Schema({
    fecha: { type: String, required: true},
    turno: { type: Number, required: true},
    inventario: { type: Number, required: true},
    capacidad: { type: Number, required: true},
    hora_inicio: { type: String, required: true},
    hora_fin: { type: String, required: true},
    status: { type: Number, required: true},
    id_rvc: { type: mongoose.Schema.Types.ObjectId, ref: 'RVCs', required: true},

})

DisponibilidadSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

DisponibilidadSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Disponibilidad', DisponibilidadSchema);
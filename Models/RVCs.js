const mongoose = require('mongoose');

const RVCsSchema = mongoose.Schema({
    rvc_nombre: { type: String, required: true},
    rvc_cod: { type: String, required: true},
    rvc_status: { type: Number, required: true},
    rvc_show_landing: { type: Number, required: true},
    rvc_show_reservas: { type: Number, required: true},
    rvc_dias_activo: [{
        lunes: { type: Number, required: true},
        martes: { type: Number, required: true},
        miercoles: { type: Number, required: true},
        jueves: { type: Number, required: true},
        viernes: { type: Number, required: true},
        sabado: { type: Number, required: true},
        domingo: { type: Number, required: true}
    }]
})

RVCsSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

RVCsSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.models.RVCs || mongoose.model('RVCs', RVCsSchema);
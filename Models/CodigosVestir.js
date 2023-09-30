const mongoose = require('mongoose');

const codigosVestirSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    descripcion: { type: String, required: true},
    lang: { type: String, required: true, maxLength: 2},

})

codigosVestirSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

codigosVestirSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('CodsVestir', codigosVestirSchema);
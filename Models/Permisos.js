const mongoose = require('mongoose');

const PermisosSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    descripcion: { type: String, required: true},
    perfiles: [{type: String, required: true}],
    usuarios: [{type: String, required: true}],
})

PermisosSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

PermisosSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Permisos', PermisosSchema);
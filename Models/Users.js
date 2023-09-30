const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    puesto: { type: String, required: true},
    depto: { type: String, required: true},
    correo: { type: String, required: true},
    password: { type: String, required: true},
    perfil: { type: String, required: true},
})

UsersSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

UsersSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Users', UsersSchema);
const mongoose = require('mongoose');

const habitacionesSchema = mongoose.Schema({
    num_hab: { type: Number, required: true},

})

habitacionesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

habitacionesSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Habitaciones', habitacionesSchema);
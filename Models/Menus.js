const mongoose = require('mongoose');

const MenusSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    url: { type: String, required: true},
})

MenusSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

MenusSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Menus', MenusSchema);
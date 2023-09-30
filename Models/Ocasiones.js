const mongoose = require('mongoose');

const ocasionesSchema = mongoose.Schema({
    ocasion: { type: String, required: true},
    lang: { type: String, required: true}
})

ocasionesSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

ocasionesSchema.set('toJSON', {
    virtuals: true,
});

module.exports = mongoose.model('Ocasiones', ocasionesSchema);
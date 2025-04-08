const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UrlSchema = new Schema({
    originalUrl: { type: String, required: true },
    shortUrl: { type: String, required: true },
    urlCode: { type: String, required: true, unique: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    visits: [{ timestamp: { type: Date, default: Date.now } }],
    qrCode: { type: String },
});

module.exports = mongoose.model('Url', UrlSchema);
const mongoose = require('mongoose')
const shortid = require('shortid')

const shorturlSchema = new mongoose.Schema({
    longlink: {
        type: String,
        required: true,
    },
    shortlink: {
        type: String,
        required: true,
        default: shortid.generate,
    },
    clicks: {
        type: Number,
        required: true,
        default: 0
    }
})
module.exports = mongoose.model('Shorturl', shorturlSchema) 
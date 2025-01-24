const mongoose = require('mongoose')
const shortId = require('shortid')

const shortUrlSchema = new mongoose.Schema({
    long: {
        type: String,
        required: true
    },
    short: {
        type: String,
        required: true,
        default: shortId.generate
    },
    clicked: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: String,
        required: true,
        default: () => {
            const now = new Date()
            const months = [
                "January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ];
            return `${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`
        }
    },
    time: {
        type: String,
        required: true,
        default: () => {
            const now = new Date()
            return `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
        }
    }
})

module.exports = mongoose.model('ShortUrl', shortUrlSchema)
require('dotenv').config()
const express = require('express')
// const cors = require('cors')
const mongoose = require('mongoose')
const ShortUrl = require('../models/shortUrl')
const app = express()

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}))

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('connected to db')
}).catch((err) => {
    console.log('failed to connect', err)
})

app.get('/', async (req, res) => {
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls: shortUrls})
})

app.post('/shortUrl', async (req, res) => {
    await ShortUrl.create({ long: req.body.longUrl })
    res.redirect('/')
})

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl })

    if (shortUrl == null) {
        return res.sendStatus(404)
    }

    shortUrl.clicked++
    shortUrl.save()

    res.redirect(shortUrl.long)
})

app.listen(process.env.PORT || 3000)
require("dotenv").config()

const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Shorturl = require('./models/shorturl')

mongoose.connect(process.env.DATABASE_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})

app.set("view engine","ejs")
app.use(express.static("public"))
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {
    const shorturls = await Shorturl.find()
    res.render('index',{ shorturls: shorturls })
})

app.post('/shorturls', async (req, res) => {
    await Shorturl.create({ longlink: req.body.longlink })
    res.redirect('/')
})

app.get('/:id', async (req, res) => {
    const shortUrl = await Shorturl.findOne({ shortlink: req.params.id })
    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.clicks++
    shortUrl.save()

    res.redirect(shortUrl.longlink)
})

app.listen(process.env.PORT || 3000)
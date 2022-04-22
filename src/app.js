const express = require('express')
const app = express()
const mongoose = require('mongoose')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect("mongodb://loclhost:27017/guiapics", { useNewUrlParser: true, useUnifiedTopology: true })

app.get("/", (req, res) => {
    res.json({})
})

module.exports = app
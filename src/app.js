const express = require('express')
const app = express()
const mongoose = require('mongoose')
const user = require("./models/User")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

mongoose.connect("mongodb://172.17.0.2:27017/guiapics", { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        // console.log("Conectado com o banco")
    }).catch((err) => {
        // console.log(err)
    })
const User = mongoose.model("User", user)
app.get("/", (req, res) => {
    res.json({})
})

app.post("/user", async(req, res) => {
    try {
        let newUser = new User({ name: req.body.name, email: req.body.email, password: req.body.password })
        await newUser.save()
        res.json({ email: req.body.emai })
    } catch (error) {
        res.sendStatus(500)
    }

})
module.exports = app
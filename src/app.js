const express = require('express')
const app = express()
const mongoose = require('mongoose')
const user = require("./models/User")
let bcrypt = require('bcrypt')

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

    if (req.body.name == "" || req.body.email == "" || req.body.password == "") {
        res.sendStatus(400)
        return
    }



    try {
        const user = await User.findOne({ "email": req.body.email })

        if (user != undefined) {
            res.statusCode = 400
            res.json({ error: "E-mail já cadastrado" })
            return
        }

        let password = req.body.password
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(password, salt)

        let newUser = new User({ name: req.body.name, email: req.body.email, password: hash })
        await newUser.save()
        res.json({ email: req.body.email })
    } catch (error) {
        res.sendStatus(500)
    }

})
module.exports = app
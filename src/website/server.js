const express = require("express")
const app = express()
const config = require("../../resource/config.json")
const path = require("path")

module.exports = (client) => {
    const config = client.config

    app.listen(config.port || 80, () => console.log(`Website online! (${config.website.domain}:${config.website.port})`))

    app.set("views", path.join(__dirname, "/views"))
    app.set("view engine", "pug")


    app.get("/", (req, res) => {
        res.render("index", {
            client
        })
    })

    app.get("/commands", (req, res) => {
        res.render("commands", {client})
    })

    app.get("*", (req, res) => {
        res.redirect("/")
    })
}
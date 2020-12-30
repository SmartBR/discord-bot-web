const Discord = require("discord.js")
const client = new Discord.Client()
client.config = require("../../resource/config.json")

client.on("ready", () => {
    require("../website/server")(client)

    console.log("Aplicação online!")
})

client.login(client.config.token)
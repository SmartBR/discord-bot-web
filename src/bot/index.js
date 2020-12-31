const Discord = require("discord.js")
const client = new Discord.Client()
client.config = require("../../resource/config.json")

const fs = require("fs")
const path = require("path")

const commandCategories = [
    { name: "Diversão", identify: "fun", description: "Aquele baguncinha não pode faltar né ?"},
    { name: "Minecraft", identify: "minecraft", description: "O famoso joguinho não pode faltar."}
]

client.commands = new Discord.Collection()
client.commandCategories = new Discord.Collection()

commandCategories.forEach(category => {
    fs.readdirSync(path.join(__dirname, `/command/${category.identify}`)).forEach(file => {
        const command = require(`./command/${category.identify}/${file}`)
        const categories = client.commandCategories

        command.category = category

        client.commands.set(command.name, command)
        categories.set(category, categories.get(category.identify) ? categories.get(category.identify).push(command) : [command])
    })
})

client.on("ready", () => {
    require("../website/server")(client)

    console.log("Aplicação online!")
})

client.login(client.config.token)
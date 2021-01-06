const Discord = require("discord.js")
const client = new Discord.Client()
client.config = require("../../resource/config.json")

const fs = require("fs")
const path = require("path")

// Se adicionar mais categorias, você terá que colocar abaixo
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

        if (categories.get(category.identify)) {
            categories.get(category.identify).push(command)
        }else categories.set(category.identify, [command])
    })
})

client.on("ready", () => {
    require("../website/server")(client)

    console.log("Aplicação online!")
})

client.on("message", (message) => {
    if (message.author.bot || !message.content.startsWith(client.config.prefix)) return

    const args = message.content.slice(client.config.prefix.length).split(" ")
    const commandName = args.shift()
    const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if (command) {
        try {
            command.execute(client, message, args)
        }catch(err) {
            console.error(err)
            message.reply("houve um erro ao executar este comando.")
        }
    }
})

client.login(client.config.token)
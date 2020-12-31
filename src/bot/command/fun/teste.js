module.exports = {
    name: "teste",
    description: "Comando de teste.",
    aliases: ["test"],
    execute: (client, message, args) => {
        message.reply("hello ?")
    }
}
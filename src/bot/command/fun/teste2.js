module.exports = {
    name: "teste2",
    description: "Comando de teste2.",
    aliases: ["test2"],
    execute: (client, message, args) => {
        message.reply("hello ?")
    }
}
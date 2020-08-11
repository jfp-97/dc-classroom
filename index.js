const { BOT_TOKEN, PREFIX } = require('./utils/config')
const fs = require('fs')
const Discord = require('discord.js')

const client = new Discord.Client()
client.commands = new Discord.Collection()
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.once('ready', () => {
  console.log('Ready')
})

client.on('message', message => {
  if (!message.content.startsWith(PREFIX) || message.author.bot) return

  const args = message.content.slice(PREFIX.length).trim().split(/ +/)
  const commandName = args.shift().toLowerCase()

  if (!client.commands.has(commandName)) return

  const command = client.commands.get(commandName)

  try {
    command.execute(message, args)
  } catch (error) {
    console.error(error)
    message.reply('Hubo un error al intentar ejecutar el comando')
  }
})

client.login(BOT_TOKEN)

const { Client } = require('discord.js')
const supabase = require('./database.js')
require('dotenv').config()
const http = require('http')

const client = new Client({ intents: 32767 })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

client.on('interactionCreate', async interaction => {
  if (!interaction.isCommand()) return
  if (!interaction.memberPermissions.has('ADMINISTRATOR')) {
    await interaction.reply({
      content: 'No tienes permisos para ejecutar este comando',
      ephemeral: true
    })
    return
  }
  const { commandName } = interaction
  const command = require(`./commands/${commandName}.js`)
  await command.execute(interaction, supabase)
})

client.login(process.env.DISCORD_TOKEN)

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Status: Active');
});

server.listen(port, () => console.log(`Listening on port ${port}`));

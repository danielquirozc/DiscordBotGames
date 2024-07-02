const pool = require('../database');
const { Collection } = require('discord.js');
const fs = require('fs');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction) {
    if (!interaction.isCommand()) return;

    const commands = new Collection();
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const command = require(`../commands/${file}`);
      commands.set(command.data.name, command);
    }

    const command = commands.get(interaction.commandName);

    if (!command) return;

    try {
      await command.execute(interaction, pool);
    } catch (error) {
      console.error(error);
      await interaction.reply({ content: 'Hubo un error al ejecutar este comando.', ephemeral: true });
    }
  },
};

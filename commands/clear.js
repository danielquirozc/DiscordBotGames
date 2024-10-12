const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('clear')
    .setDescription('Clear chat')
    .addIntegerOption(option =>
      option
        .setName('amount')
        .setDescription('La cantidad de mensajes a borrar')
        .setRequired(true)
    ),
  async execute (interaction) {
    const amount = interaction.options.getInteger('amount')
    if (amount <= 0 || amount > 100) {
      await interaction.reply('La cantidad debe ser mayor a 0 y menor a 100')
      return
    }
    await interaction.channel.bulkDelete(amount)
    await interaction.reply(`Borrado ${amount} mensajes`)
  }
}

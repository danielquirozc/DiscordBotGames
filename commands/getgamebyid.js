const { SlashCommandBuilder } = require('discord.js')
const { getGameByID } = require('../querys/getGameByID')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('getgamebyid')
    .setDescription('Muestra un juego por su ID')
    .addIntegerOption(option =>
      option
        .setName('id')
        .setDescription('ID del juego')
        .setRequired(true)
    ),
    async execute (interaction) {
      const id = interaction.options.getInteger('id')
      const { data, error } = await getGameByID(id)
      
      if (error) {
        await interaction.reply({ content: error })
        return
      }
      const game = `${data.id} - ${data.title} \n ${data.description} `      
      await interaction.reply({ content: game })
    }
}

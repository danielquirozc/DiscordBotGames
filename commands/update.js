const { SlashCommandBuilder } = require('discord.js');
const { updateGame } = require('../querys/updateGame');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('update')
    .setDescription('Actualiza un juego')
    .addIntegerOption(option =>
      option
        .setName('id')
        .setDescription('ID del juego')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('column')
        .setDescription('Columna a actualizar')
        .setRequired(true)
        .addChoices(
          { name: 'title', value: 'title' },
          { name: 'description', value: 'description' },
          { name: 'size', value: 'size' },
          { name: 'links', value: 'links' },
        )
    )
    .addStringOption(option =>
      option
        .setName('new_info')
        .setDescription('Nueva información')
        .setRequired(true)
    ),

  async execute(interaction) {
    const id = interaction.options.getInteger('id');
    const column = interaction.options.getString('column');
    const new_info = interaction.options.getString('new_info');

    const { error } = await updateGame({ id, column, new_info });

    if (error) {
      return await interaction.reply({ content: error, ephemeral: true });
    }
    return await interaction.reply({ content: 'Juego actualizado', ephemeral: true });
  }
};

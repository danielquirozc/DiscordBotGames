const {
  SlashCommandBuilder,
} = require('discord.js')
const { convertToObjectArray } = require('../utils/convertToObjectArray')
const { addGame } = require('../querys/addGame');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('newgame')
    .setDescription('Anuncia un nuevo juego')
    .addStringOption(option =>
      option
        .setName('title')
        .setDescription('El título del juego')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('description')
        .setDescription('La descripción del juego')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('size')
        .setDescription('El tamaño del juego')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('images')
        .setDescription('Ingresa las imágenes separadas por coma')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('tags')
        .setDescription('Ingresa los id de los tags separados por coma')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('links')
        .setDescription('Ingresa plataforma,url, plataforma,url')
        .setRequired(true)
    ),

  async execute(interaction) {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const size = interaction.options.getString('size');
    const images = interaction.options.getString('images').replaceAll(' ', '').split(',');
    const links = convertToObjectArray(interaction.options.getString('links'));
    const tags = interaction.options.getString('tags').replaceAll(' ', '').split(',');

    const { error } = await addGame({title, description, size, tags, images, links});

    if (error) {
      return await interaction.reply({ content: error, ephemeral: true });
    }

    return await interaction.reply({ content: 'Juego añadido', ephemeral: true });
  }
};

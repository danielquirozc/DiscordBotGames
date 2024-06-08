const { SlashCommandBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('addgame')
    .setDescription('Añadir un juego a la base de datos')
    .addStringOption(option => option.setName('title').setDescription('El título del juego').setRequired(true))
    .addStringOption(option => option.setName('description').setDescription('La descripción del juego').setRequired(true))
    .addStringOption(option => option.setName('size').setDescription('El tamaño del juego').setRequired(true))
    .addStringOption(option => option.setName('image').setDescription('La URL de la imagen del juego').setRequired(true))
    .addStringOption(option => option.setName('downloadlink').setDescription('El link de descarga del juego').setRequired(true)),
  async execute(interaction, connection) {
    const title = interaction.options.getString('title');
    const description = interaction.options.getString('description');
    const size = interaction.options.getString('size');
    const image = interaction.options.getString('image');
    const downloadLink = interaction.options.getString('downloadlink');

    const query = 'INSERT INTO games (title, description, size, image, downloadLink) VALUES (?, ?, ?, ?, ?)';
    const values = [title, description, size, image, downloadLink];

    connection.query(query, values, (err, results) => {
      if (err) {
        console.error('Error inserting game:', err);
        return interaction.reply('Hubo un error al guardar el juego.');
      }
      interaction.reply('Juego añadido con éxito a la base de datos.');
    });
  }
};

const { SlashCommandBuilder } = require('discord.js');
const { convertToObjectArray } = require('../utils/convertToObjectArray');

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
        .setName('columna')
        .setDescription('Columna a actualizar')
        .setRequired(true)
        .addChoices(
          { name: 'title', value: 'title' },
          { name: 'description', value: 'description' },
          { name: 'size', value: 'size' },
          { name: 'images', value: 'images' },
          { name: 'links', value: 'links' },
          { name: 'type', value: 'type' }
        )
    )
    .addStringOption(option =>
      option
        .setName('nueva_informacion')
        .setDescription('Nueva información')
        .setRequired(true)
    ),

  async execute(interaction, pool) {
    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      await interaction.reply({
        content: 'No tienes permisos para ejecutar este comando',
        ephemeral: true,
      });
      return;
    }

    const id = interaction.options.getInteger('id');
    const column = interaction.options.getString('columna');
    let value = interaction.options.getString('nueva_informacion');

    if (column === 'links') {
      value = convertToObjectArray(value);
      if (!Array.isArray(value) || value.some(link => !link.nombre || !link.url)) {
        await interaction.reply({
          content: 'Formato de botones inválido. Asegúrate de que esté en formato JSON y que cada botón tenga un "nombre" y un "url"',
          ephemeral: true,
        });
        return;
      }
    } else if (column === 'images') {
      value = value.split(',');
    }

    const query = `UPDATE games SET ${column} = ? WHERE id = ?`;

    pool.query(query, [value, id], (err, result) => {
      if (err) {
        console.error('Error updating the database:', err);
        interaction.reply({
          content: 'Hubo un error actualizando la base de datos',
          ephemeral: true,
        });
        return;
      }

      if (result.affectedRows === 0) {
        interaction.reply({
          content: 'No se encontró el juego',
          ephemeral: true,
        });
      } else {
        interaction.reply({
          content: 'Juego actualizado',
          ephemeral: true,
        });
      }
    });
  }
};

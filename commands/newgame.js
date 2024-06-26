const { SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require("discord.js");
const { convertToObjectArray } = require("../utils/convertToObjectArray");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("newgame")
    .setDescription("Anuncia un nuevo juego")
    .addStringOption((option) =>
      option
        .setName("title")
        .setDescription("El título del juego")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("description")
        .setDescription("La descripción del juego")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("size")
        .setDescription("El tamaño del juego")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("image")
        .setDescription("La URL de la imagen del juego")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("botones")
        .setDescription("Ingresa los botones en formato nombre>valor, url>valor")
        .setRequired(true)
    ),

  async execute(interaction) {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      await interaction.reply({ content: "No tienes permisos suficientes para ejecutar este comando.", ephemeral: true });
      return;
    }
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const size = interaction.options.getString("size");
    const image = interaction.options.getString("image");
    const buttonsInFormat = interaction.options.getString("botones");
    let downloadLinks;
    try {
      downloadLinks = convertToObjectArray(buttonsInFormat);
      if (
        !Array.isArray(downloadLinks) ||
        downloadLinks.some((link) => !link.nombre || !link.url)
      ) {
        throw new Error("Invalid format");
      }
    } catch (error) {
      await interaction.reply({
        content:
          'Formato de botones inválido. Asegúrate de que esté en formato JSON y que cada botón tenga un "nombre" y un "url".',
        ephemeral: true,
      });
      return;
    }
    const embed = new EmbedBuilder()
      .setTitle(`${title} - ${size}`)
      .setDescription(description)
      .setColor(0x00ae86);

    if (image) {
      embed.setImage(image);
    }

    // Crear los botones en filas (Discord permite hasta 5 botones por fila)
    const rows = [];
    for (let i = 0; i < downloadLinks.length; i += 5) {
      const buttons = new ActionRowBuilder();
      downloadLinks.slice(i, i + 5).forEach((link) => {
        buttons.addComponents(
          new ButtonBuilder()
            .setLabel(link.nombre)
            .setStyle(ButtonStyle.Link)
            .setURL(link.url)
        );
      });
      rows.push(buttons);
    }
    await interaction.reply({ embeds: [embed], components: rows });
  },
};
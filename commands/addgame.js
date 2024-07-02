const { SlashCommandBuilder } = require("discord.js");
const { convertToObjectArray } = require("../utils/convertToObjectArray");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addgame")
    .setDescription("Agrega un juego a la base de datos")
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
        .setDescription("El tamaño del juego ejemplo 101MB, 1GB, 10GB")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("image")
        .setDescription("Las URLs de la imagenes separada por comas")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("botones")
        .setDescription("Ingresa los botones en formato nombre>valor, url>valor")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("tipo")
        .setDescription("Ingresa el tipo de juego")
        .setRequired(true)
        .addChoices(
          { name: "Normal", value: "normal" },
          { name: "+18", value: "+18" }
        )
    ),

  async execute(interaction, pool) {
    if (!interaction.member.permissions.has("ADMINISTRATOR")) {
      await interaction.reply({ content: "No tienes permisos suficientes para ejecutar este comando.", ephemeral: true });
      return;
    }
    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const size = interaction.options.getString("size");
    const image = interaction.options.getString("image");
    const buttonsInFormat = interaction.options.getString("botones");
    const tipo = interaction.options.getString("tipo");
    let imgs;
    let downloadLinks;

    try {
      imgs = image.split(",");
      downloadLinks = convertToObjectArray(buttonsInFormat);
      if (!Array.isArray(downloadLinks) || downloadLinks.some((link) => !link.nombre || !link.url)) {
        throw new Error("Invalid format");
      }
    } catch (error) {
     return await interaction.reply({ content: 'Formato de botones o imagenes inválido. Asegúrate de escribir bien el formato.', ephemeral: true });
    }

    pool.getConnection(async (err, connection) => {
      if (err) throw err;
      connection.query(`INSERT INTO games (title, description, size, images, links, type) VALUES (?, ?, ?, ?, ?, ?);`,
        [title, description, size, JSON.stringify(imgs), JSON.stringify(downloadLinks), tipo],
        async (err, result) => {
          if (err) {
            console.log(err);
            await interaction.reply({ content: "Error al insertar el juego en la base de datos.", ephemeral: true });
            return;
          };
          await interaction.reply({ content: "Juego insertado correctamente.", ephemeral: true });
          return;
        });
      connection.release();
    });
  },
};
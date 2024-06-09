const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("addgame")
    .setDescription("Añadir un juego a la base de datos")
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
        .setName("downloadlink")
        .setDescription("El link de descarga del juego")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("category")
        .setDescription("La categoría del juego")
        .setRequired(true)
        .addChoices(
          { name: "Acción", value: "Acción" },
          { name: "Aventura", value: "Aventura" },
          { name: "RPG", value: "RPG" },
          { name: "Deportes", value: "Deportes" },
          { name: "Simulación", value: "Simulación" },
          { name: "Estrategia", value: "Estrategia" },
          { name: "Puzzle", value: "Puzzle" },
          { name: "Terror", value: "Terror" },
          { name: "Carreras", value: "Carreras" },
          { name: "Educativos", value: "Educativos" },
          { name: "Gore", value: "Gore" },
          { name: "Hentai", value: "Hentai" },
          { name: "Otros", value: "Otros" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("device")
        .setDescription("El dispositivo del juego")
        .setRequired(true)
        .addChoices(
          { name: "PC", value: "PC" },
          { name: "Android", value: "Android" },
          { name: "Otros", value: "Otros" }
        )
    ),
  async execute(interaction, connection) {

    const member = await interaction.guild.members.fetch(interaction.user.id);

    if (!member.permissions.has("ADMINISTRATOR")) {
      await interaction.reply({ content: "No tienes permisos suficientes para ejecutar este comando.", ephemeral: true });
      return;
    }

    const title = interaction.options.getString("title");
    const description = interaction.options.getString("description");
    const size = interaction.options.getString("size");
    const image = interaction.options.getString("image");
    const downloadLink = interaction.options.getString("downloadlink");
    const category = interaction.options.getString('category');
    const device = interaction.options.getString('device');

    connection.query(
      "INSERT INTO games (title, description, size, image, downloadLink, category, device) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, description, size, image, downloadLink, category, device],
      (error, results) => {
        if (error) {
          console.error(error);
          return;
        }
      }
    );
    await interaction.reply({ content: "Juego añadido correctamente", ephemeral: true });
  },
};

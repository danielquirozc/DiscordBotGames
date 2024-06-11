const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clear chat")
    .addIntegerOption((option) =>
      option
        .setName("amount")
        .setDescription("La cantidad de mensajes a borrar")
        .setRequired(true)
    ),
  async execute(interaction) {

    if (!interaction.member.permissions.has("MANAGE_MESSAGES")) {
      await interaction.reply("No tienes permisos suficientes para ejecutar este comando.");
      return;
    }
    const amount = interaction.options.getInteger("amount");
    if (amount <= 0) {
      await interaction.reply("La cantidad debe ser mayor a 0");
      return;
    }
    if (amount > 100) {
      await interaction.reply("La cantidad debe ser menor o igual a 100");
      return;
    }
    await interaction.channel.bulkDelete(amount);
    await interaction.reply(`Borrado ${amount} mensajes`);
  },
};
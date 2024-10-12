const { SlashCommandBuilder } = require('discord.js')
const shortenUrlFclc = require('../utils/fclc')
const { shortenUrlCuty } = require('../utils/cuty')
require('dotenv').config()

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shorten')
    .setDescription('Shorten URL')
    .addStringOption(option =>
      option.setName('url').setDescription('URL to shorten').setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('alias')
        .setDescription('Alias of the shortened URL')
        .setRequired(true)
    )
    .addStringOption(option =>
      option
        .setName('title')
        .setDescription('Title of the shortened URL')
        .setRequired(true)
        .setMaxLength(50)
    )
    .setDMPermission(false),

  async execute (interaction) {
    const url = interaction.options.getString('url')
    const title = interaction.options.getString('title')
    const alias = interaction.options.getString('alias')
    let cutyUrl
    let fclcUrl
    try {
      cutyUrl = await shortenUrlCuty(url, title)
    } catch (error) {
      return await interaction.reply(`Cuty: ${error}`)
    }
    try {
      fclcUrl = await shortenUrlFclc(cutyUrl, title, alias)
    } catch (error) {
      return await interaction.reply(`FCLC: ${error}`)
    }
    return await interaction.reply(
      `${title}\n**Link:** <${fclcUrl}>`
    )
  }
}

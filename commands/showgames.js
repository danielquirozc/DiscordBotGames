const {
  SlashCommandBuilder,
  ApplicationCommandOptionType
} = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('showgames')
    .setDescription('Muestra todos los juegos')
    .setDMPermission(false)
    .addIntegerOption(option =>
      option
        .setName('offset')
        .setDescription('La cantidad de juegos a mostrar desde el último')
        .setRequired(false)
    ),

  async execute (interaction, supabase) {
    const offset = interaction.options.getInteger('offset') || 0
    const { data, error } = await supabase
      .from('games')
      .select()
      .order('id', { ascending: true })
      .range(offset, offset + 10)      
    if (error || !data.length) {
      console.error('Error fetching games:', error)
      return await interaction.reply({ content: 'No se pudieron mostrar los juegos' })
    }
    const mappedData = data.map(
      game => `${game.id} - ${game.title} \n ${game.description} `
    )
    await interaction.reply({ content: `${mappedData.join('\n')}` })
    return
  }
}

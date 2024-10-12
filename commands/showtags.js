const { SlashCommandBuilder } = require('discord.js')

module.exports = {
  data: new SlashCommandBuilder()
    .setName('showtags')
    .setDescription('Muestra todos los tags'),

  async execute (interaction, supabase) {
    const { data, error } = await supabase.from('tags').select()
    if (error) {
      console.error('Error fetching games:', error)
      return await interaction.reply({ content: 'Error fetching tags' })
    }
    const mappedData = data.map(game => `${game.id} - ${game.name}`)
    await interaction.reply({ content: `${mappedData.join('\n')}` })
  }
}

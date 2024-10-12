const supabase = require('../database')

module.exports.getGameByID = async (id) => {
  try {
    const { data, error } = await supabase
      .from('games')
      .select()
      .eq('id', id)
      .single()
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error fetching game:', error)
    return { data: null, error: 'Error fetching game' }
  }
}
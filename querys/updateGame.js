const supabase = require('../database')

module.exports.updateGame = async ({
  id,
  column,
  new_info,
}) => {
  try {
    const { data, error } = await supabase
      .from('games')
      .update({ [column]: new_info })
      .eq('id', id)
    if (error) throw error
    return { data, error: null }
  } catch (error) {
    console.error('Error updating game:', error)
    return {data: null, error: 'Error updating game' }
  }
}
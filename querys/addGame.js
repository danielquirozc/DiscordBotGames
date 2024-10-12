const supabase = require('../database');

module.exports.addGame = async ({
  title,
  description,
  size,
  tags,
  images,
  links,
}) => {
  try {
    // Insertando los datos básicos del juego
    const { data: gameData, error: gameError } = await supabase
      .from('games')
      .insert([
        {
          title,
          description,
          size,
          links: JSON.stringify(links),
        },
      ])
      .select('id');

    if (gameError) throw gameError;

    const gameId = gameData[0].id;

    // Mapeando y insertando los tags
    const mappedTags = tags.map((tag) => ({
      game_id: gameId,
      tag_id: tag,
    }));

    const { error: tagsError } = await supabase.from('game_tags').insert(mappedTags);
    if (tagsError) throw tagsError;

    // Mapeando y insertando las imágenes
    const mappedImages = images.map((image) => ({
      game_id: gameId,
      url: image,
    }));

    const { error: imagesError } = await supabase.from('images').insert(mappedImages);
    if (imagesError) throw imagesError;

    return { data: gameData, error: null };
  } catch (error) {
    // Registro de errores para facilitar la depuración
    console.error('Error adding game:', error);
    return { data: null, error: error.message };
  }
};

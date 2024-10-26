require('dotenv').config();

const shortenUrlFclc = async (url, title, alias) => {
  let data;
  try {
    data = await fetch(`https://fc.lc/api?api=${process.env.FCLC_API_KEY}&url=${url}${alias ? `&alias=${alias}` : ''}&title=${title}`)
  } catch (error) {
    throw error
  }
  const jsonData = await data.json();
  if (jsonData.status === 'error') {
    throw jsonData.message
  }
  return jsonData.shortenedUrl;
}

module.exports = shortenUrlFclc
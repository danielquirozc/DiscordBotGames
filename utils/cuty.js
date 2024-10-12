require('dotenv').config();

const shortenUrlCuty = async (url, title) => {
  let data;
  try {
    data = await fetch(`https://api.cuty.io/full?token=${process.env.CUTY_API_KEY}&url=${url}&title=${title}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });    
  } catch (error) {
    throw error
  }
  const jsonData = await data.json();
  if (jsonData.errors) {
    const error = Object.values(jsonData.errors)[0]
    throw JSON.stringify(error)
  }
  return jsonData.data.short_url
}

module.exports.shortenUrlCuty = shortenUrlCuty
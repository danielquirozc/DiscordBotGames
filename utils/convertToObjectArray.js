module.exports.convertToObjectArray = input => {
  let array = input.replaceAll(" ", "").split(",")
  let obj = []
  for (let i = 0; i < array.length; i += 2) {
    obj.push({
      name: array[i],
      url: array[i + 1]
    })
  }

  return obj
}

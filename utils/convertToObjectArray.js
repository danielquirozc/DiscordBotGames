module.exports.convertToObjectArray = (input) => {
  // Dividimos la cadena en pares "nombre>valor"
  const pairs = input.split(",");
  const result = [];

  // Recorremos los pares en pasos de 2 (nombre y url)
  for (let i = 0; i < pairs.length; i += 2) {
    // Extraemos el nombre y la url de cada par
    const nombre = pairs[i].split(">")[1].trim();
    const url = pairs[i + 1].split(">")[1].trim();

    // Creamos un objeto con el nombre y la url
    const obj = { nombre, url };

    // Añadimos el objeto al array resultado
    result.push(obj);
  }
  return result;
}

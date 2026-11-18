export function getRequestBody(request) {
  return new Promise((resolve, reject) => {
    let chunks = [];

    // acumular cada fragmento de dato
    request.on("data", (chunk) => {
      chunks.push(chunk);
    });

    // unir todos los fragmentos y resolver al terminar
    request.on("end", () => {
      const requestBody = Buffer.concat(chunks).toString("utf8");
      resolve(requestBody);
    });

    // capturar errores para rechazar la promesa
    request.on("error", (err) => reject(err));
  });
}

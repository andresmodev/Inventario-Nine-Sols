import http from "http";
import { readFile } from "fs/promises";

async function readUsersFile(pathFile) {
  try {
    const content = await readFile(pathFile, "utf-8");

    const data = JSON.parse(content);
    return data;
  } catch (error) {
    console.error(`Error al leer o procesar el archivo: ${error}`);
    throw error;
  }
}

const PORT = 3000;

const server = http.createServer(async (request, response) => {
  try {
    // desestructurar el metodo y url del objeto de petición
    const { method, url } = request;

    // cabeceras CORS para permitir la conexión cliente-servidor con el metodo POST
    // las cabeceras las coloco una vez sepa que el metodo GET funciona

    // cabecera global para especificar el tipo de contenido y el idioma que quiero que node traduzca
    response.setHeader("Content-Type", "application/json; charset=UTF-8");

    // Obtener los datos y enviarlos como json al cliente
    if (method === "GET" && url === "/api/users/") {
      const dataUsers = await readUsersFile("./data/users.json");
      response.statusCode = 200;
      response.end(JSON.stringify(dataUsers));
    } else {
      response.statusCode = 404;
      response.end(JSON.stringify({ message: "Ruta no encontrada" }));
    }
  } catch (error) {
    response.statusCode = 500;
    response.end(JSON.stringify({ message: `Error interno del servidor: ${error}` }));
  }
});

server.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));

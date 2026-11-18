import http from "http";
import { readUsersFile, addUserToFile } from "./services/fileService.js";
import { getRequestBody } from "./utils/requestHelpers.js";

const PORT = 3000;

const server = http.createServer(async (request, response) => {
  try {
    const { method, url } = request;

    // cabeceras CORS para permitir la conexión cliente-servidor
    response.setHeader("Access-Control-Allow-Origin", "*"); // autorizar el origen, por el momento es global
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS"); // lista de verbos http autorizados
    response.setHeader("Access-Control-Allow-Headers", "Content-Type"); // autorización de que cabeceras se permiten

    // aprobar la verificación previa (preflight) de CORS y cortar la ejecución
    if (method === "OPTIONS") {
      response.writeHead(204);
      response.end();
      return;
    }

    // indicar al cliente que la respuesta es JSON y usa codificación UTF-8 (para tildes y caracteres especiales)
    response.setHeader("Content-Type", "application/json; charset=UTF-8");

    // Obtener los datos y enviarlos como JSON al cliente
    if (method === "GET" && url === "/api/users/") {
      const dataUsers = await readUsersFile("./data/users.json");
      response.statusCode = 200;
      response.end(JSON.stringify(dataUsers));
      return;
    }

    // recibir las partes del cliente, validar los datos, asignar ID y enviar el nuevo objeto al archivo JSON
    if (method === "POST" && url === "/api/users/") {
      let requestBody = await getRequestBody(request);
      let userData; // parsear el JSON

      // intentar convertir el cuerpo de la petición de JSON a JavaScript
      try {
        userData = JSON.parse(requestBody);
      } catch (error) {
        response.statusCode = 400;
        response.end(
          JSON.stringify({
            message: "El formato JSON enviado no es válido",
            detail: error.message,
          }),
        );
        return;
      }

      // comprobar que los datos recibidos sean un objeto válido
      if (userData === null || typeof userData !== "object" || Array.isArray(userData)) {
        response.statusCode = 400;
        response.end(JSON.stringify({ message: "Los datos enviados no son válidos" }));
        return;
      }

      // validar los campos obligatorios
      if (typeof userData.name !== "string" || !userData.name.trim()) {
        response.statusCode = 400;
        response.end(
          JSON.stringify({ message: "El nombre debe ser una cadena de texto no vacía" }),
        );
        return;
      }

      if (typeof userData.userName !== "string" || !userData.userName.trim()) {
        response.statusCode = 400;
        response.end(
          JSON.stringify({ message: "El nombre de usuario debe ser una cadena de texto no vacía" }),
        );
        return;
      }

      if (typeof userData.email !== "string" || !userData.email.trim()) {
        response.statusCode = 400;
        response.end(
          JSON.stringify({ message: "El correo debe ser una cadena de texto no vacía" }),
        );
        return;
      }

      if (
        typeof userData.age !== "number" ||
        !Number.isFinite(userData.age) ||
        !Number.isInteger(userData.age) ||
        userData.age < 10
      ) {
        response.statusCode = 400;
        response.end(
          JSON.stringify({
            message: "La edad debe ser un número válido y no puede ser menor de 10",
          }),
        );
        return;
      }

      if (typeof userData.isActive !== "boolean") {
        response.statusCode = 400;
        response.end(JSON.stringify({ message: "El estado activo debe ser un valor booleano" }));
        return;
      }

      // construir el nuevo usuario con los datos previamente validados
      const newUser = {
        id: crypto.randomUUID(),
        name: userData.name.trim(),
        userName: userData.userName.trim(),
        email: userData.email.trim(),
        age: userData.age,
        isActive: userData.isActive,
      };

      await addUserToFile("./data/users.json", newUser);

      // responder indicando que el usuario fue creado correctamente
      response.statusCode = 201;
      response.end(JSON.stringify(newUser));
      return;
    }

    response.statusCode = 404;
    response.end(JSON.stringify({ message: "Ruta no encontrada" }));
  } catch (error) {
    response.statusCode = 500;
    response.end(JSON.stringify({ message: `Error interno del servidor: ${error}` }));
  }
});

server.listen(PORT, () => console.log(`Servidor ejecutándose en http://localhost:${PORT}`));

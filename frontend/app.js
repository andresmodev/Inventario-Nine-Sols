import { getUsers } from "./services/services-http.js";
import { render } from "./ui/render.js";

// contenedor principal con los datos de los usuarios
const container = document.querySelector(".data-content");

// funcion encargada de obtener la respuesta del fetch e inicializar la app
export const initApp = async () => {
  // cargar y renderizar usuarios
  const users = await getUsers();
  render(container, users);
};

import { getUsers } from "./services.js";
import { render } from "./ui/render.js";
import { initCreateModal } from "./ui/modalCreate.js";

// contenedor principal con los datos de los usuarios
const container = document.querySelector(".data-content");

initCreateModal();

// funcion encargada de obtener la respuesta del fetch
const initApp = async () => {
  // cargar y renderizar usuarios
  const users = await getUsers();
  render(container, users);
};

// iniciar la aplicación con los datos si la respuesta es correcta
initApp();

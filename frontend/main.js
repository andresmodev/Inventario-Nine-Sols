import { getUsers } from "./services.js";
import { render } from "./ui.js";

// el contenedor que muestra el render
const container = document.querySelector(".data-content");

const initApp = async () => {
  const users = await getUsers();
  render(container, users);
};

initApp();

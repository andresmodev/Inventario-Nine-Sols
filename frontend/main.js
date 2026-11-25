import { initApp } from "./app.js";
import { initCreateModal } from "./ui/modal-create.js";
import handlerCreateForm from "./handlers/form-create-user.js";

initApp();
initCreateModal();
handlerCreateForm(initApp);

import { createUser } from "../services/services-http.js";
import { validateUserForm } from "../utils/validations.js";

const inputName = document.getElementById("name");
const inputUserName = document.getElementById("userName");
const inputEmail = document.getElementById("email");
const inputAge = document.getElementById("age");

const formCreateUser = document.querySelector(".form-create-user");

function handlerCreateForm(onUserCreate) {
  formCreateUser.addEventListener("submit", async (e) => {
    e.preventDefault();

    const selectRadio = document.querySelector("input[name='isActive']:checked");

    const userData = {
      name: inputName.value.trim(),
      userName: inputUserName.value.trim(),
      email: inputEmail.value.trim(),
      age: Number(inputAge.value),
      isActive: selectRadio.value === "inactive" ? false : true,
    };

    const isValidData = validateUserForm(userData);

    if (!isValidData.isValid) {
      console.warn("Datos invalidos:", isValidData);
      return;
    }

    await createUser(userData);

    formCreateUser.reset();

    onUserCreate();
  });
}

export default handlerCreateForm;

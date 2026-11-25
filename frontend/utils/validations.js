export function validateUserForm(userData) {
  const { name, userName, email, age, isActive } = userData;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (typeof name !== "string" || !name.trim()) {
    return { isValid: false, field: "name", message: "El nombre es obligatorio" };
  }

  if (typeof userName !== "string" || !userName.trim()) {
    return { isValid: false, field: "userName", message: "El nombre de usuario es obligatorio" };
  }

  if (typeof email !== "string" || !email.trim() || !emailRegex.test(email)) {
    return {
      isValid: false,
      field: "email",
      message: "El formato del correo electrónico no es valido",
    };
  }

  if (!Number.isFinite(age) || !Number.isInteger(age) || age < 10) {
    return {
      isValid: false,
      field: "age",
      message: "La edad debe ser un número entero y no puede ser menor a 10",
    };
  }

  if (typeof isActive !== "boolean") {
    return { isValid: false, field: "isActive", message: "El campo de activo es necesario" };
  }

  return { isValid: true, field: null, message: "" };
}

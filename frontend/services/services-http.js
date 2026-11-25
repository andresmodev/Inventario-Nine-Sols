export async function getUsers() {
  try {
    const response = await fetch("http://localhost:3000/api/users/");
    if (!response.ok) {
      throw new Error(
        `Fallas al obtener los usuarios, código ${response.status} - ${response.statusText}`,
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error en la respuesta:", error.message);
    throw error;
  }
}

export async function createUser(userData) {
  try {
    const response = await fetch("http://localhost:3000/api/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      throw new Error(`Fallas al obtener el nuevo usuario: ${response.status}`);
    }

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error("Error al realizar la petición POST:", error.message);
    throw error;
  }
}

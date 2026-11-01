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
  }
}

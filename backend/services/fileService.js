import { readFile, writeFile } from "node:fs/promises";

export async function readUsersFile(pathFile) {
  try {
    const content = await readFile(pathFile, "utf-8");

    const data = JSON.parse(content);
    return data;
  } catch (error) {
    console.error("Error al leer o procesar el archivo:", error);
    throw error;
  }
}

export async function addUserToFile(pathfile, newUser) {
  const users = await readUsersFile(pathfile);

  users.push(newUser);

  const updatedData = JSON.stringify(users, null, 2);

  await writeFile(pathfile, updatedData, "utf8");
}

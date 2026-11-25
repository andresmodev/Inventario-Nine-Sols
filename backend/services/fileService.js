import { readFile, writeFile } from "node:fs/promises";

export async function readUsersFile(pathFile) {
  try {
    const content = await readFile(pathFile, "utf-8");

    const data = JSON.parse(content);
    return data;
  } catch (error) {
    console.error("Error al leer o procesar el archivo:", error.name, error.message);
    throw error;
  }
}

export async function addUserToFile(pathfile, newUser) {
  const users = await readUsersFile(pathfile);

  users.push(newUser);

  const updatedData = JSON.stringify(users, null, 2);

  await writeFile(pathfile, updatedData, "utf8");
}

export async function deleteUserFromFile(pathfile, id) {
  const users = await readUsersFile(pathfile);

  const userExists = users.some((user) => user.id === id);

  if (!userExists) {
    return false;
  }

  const remainingUsers = users.filter((user) => user.id !== id);

  const updatedData = JSON.stringify(remainingUsers, null, 2);

  await writeFile(pathfile, updatedData, "utf-8");

  return true;
}

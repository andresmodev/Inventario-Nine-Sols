export function render(container, users) {
  container.innerHTML = "";

  users.forEach((user, index) => {
    const tr = document.createElement("tr");

    const tdId = document.createElement("td");
    tdId.textContent = index + 1;

    const tdName = document.createElement("td");
    tdName.textContent = user.name;

    const tdUserName = document.createElement("td");
    tdUserName.textContent = user.userName;

    const tdEmail = document.createElement("td");
    tdEmail.textContent = user.email;

    const tdAge = document.createElement("td");
    tdAge.textContent = user.age;

    const tdIsActive = document.createElement("td");
    tdIsActive.textContent = user.isActive;

    const tdActions = document.createElement("td");

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btn", "btn-edit");
    btnEdit.textContent = "Edit";
    const btnDelete = document.createElement("button");
    btnDelete.classList.add("btn", "btn-delete");
    btnDelete.textContent = "Delete";

    tdActions.appendChild(btnEdit);
    tdActions.appendChild(btnDelete);

    tr.appendChild(tdId);
    tr.appendChild(tdName);
    tr.appendChild(tdUserName);
    tr.appendChild(tdEmail);
    tr.appendChild(tdAge);
    tr.appendChild(tdIsActive);
    tr.appendChild(tdActions);

    container.appendChild(tr);
  });
}

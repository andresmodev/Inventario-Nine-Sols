export function initCreateModal() {
  const openModalButton = document.querySelector(".btn-modal-open");
  const createUserModal = document.querySelector(".modal");
  const closeModalButton = document.querySelector(".btn-cancel");
  // abrir
  openModalButton.addEventListener("click", () => createUserModal.showModal());

  // cerrar
  closeModalButton.addEventListener("click", () => createUserModal.close());
}

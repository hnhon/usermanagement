const openForm = document.querySelector(".add-user");
const formBack = document.querySelector("#form-back");
const form = document.querySelector("#form");

openForm.addEventListener("click", () => {
  form.setAttribute("data-type", "add");
  form.classList.toggle("active");
  document.getElementById("form-btn").textContent = "Add";
});

formBack.addEventListener("click", () => {
  form.classList.toggle("active");
  form.removeAttribute("data-type");
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = readFormData();
  form.classList.toggle("active");

  if (form.getAttribute("data-type") === "add") {
    insertNewRecord(formData);
  } else if (form.getAttribute("data-type") === "edit") {
    updateRecord(formData);
  }

  resetForm();
});

function readFormData() {
  let formData = {};
  formData["name"] = document.getElementById("name-input").value;
  formData["email"] = document.getElementById("email-input").value;
  return formData;
}

function insertNewRecord(data) {
  const tbody = document
    .getElementById("user-table")
    .getElementsByTagName("tbody");
  const table = tbody[0];
  const row = table.insertRow(-1);
  const cell1 = row.insertCell(0);
  const cell2 = row.insertCell(1);
  const cell3 = row.insertCell(2);
  cell1.innerHTML = data.name;
  cell2.innerHTML = data.email;
  cell3.innerHTML += `<span class="act-btn edit-btn" id='edit'>Edit</span><span class="act-btn delete-btn" id='delete'>Delete</span>`;
  cell3.addEventListener("click", (e) => {
    if (e.target.id === "edit") {
      onEdit(e.target);
    } else if (e.target.id === "delete") {
      onDelete(e.target);
    }
  });
}

let selectedRow = null;

function onEdit(target) {
  selectedRow = target.parentElement.parentElement;
  document.getElementById("name-input").value = selectedRow.cells[0].innerHTML;
  document.getElementById("email-input").value = selectedRow.cells[1].innerHTML;
  form.classList.toggle("active");
  document.getElementById("form-btn").textContent = "Edit";
  form.setAttribute("data-type", "edit");
}

function onDelete(target) {
  let row = target.parentElement.parentElement;
  if (confirm("Do you want to delete this record?")) {
    row.remove();
    resetForm();
  } else {
    row = null;
  }
}

function updateRecord(data) {
  selectedRow.cells[0].innerHTML = data.name;
  selectedRow.cells[1].innerHTML = data.email;
}

function resetForm() {
  form.removeAttribute("data-type");
  selectedRow = null;
  document.getElementById("name-input").value = "";
  document.getElementById("email-input").value = "";
  document.getElementById("form-btn").textContent = "Submit";
}

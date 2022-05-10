const openForm = document.querySelector(".add-user");
const formBack = document.querySelector("#form-back");
const form = document.querySelector("#form");
const addUserForm = document.querySelector("#form");
const editBtn = document.querySelectorAll(".edit-btn");

editBtn.forEach((item) => {
  item.addEventListener("click", () => {
    console.log("edit");
  });
});

openForm.addEventListener("click", () => {
  form.classList.toggle("active");
});

formBack.addEventListener("click", () => {
  form.classList.toggle("active");
});

addUserForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = readFormData();
  form.classList.toggle("active");
  insertNewRecord(formData);
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
      console.log("delete");
    }
  });
}

function onEdit(target) {
  selectedRow = target.parentElement.parentElement;

  document.getElementById("name-input").value = selectedRow.cells[0].innerHTML;
  document.getElementById("email-input").value = selectedRow.cells[1].innerHTML;
  form.classList.toggle("active");
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.productCode;
    selectedRow.cells[1].innerHTML = formData.product;
    selectedRow.cells[2].innerHTML = formData.qty;
    selectedRow.cells[3].innerHTML = formData.perPrice;
}

function resetForm() {
  console.log("reset form");
  document.getElementById("name-input").value = "";
  document.getElementById("email-input").value = "";
}

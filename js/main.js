const saveLocal = () => {
  const allData = {
    userName: nameInput.value,
    jobTitle: jobTitleInput.value,
  };
  localStorage.setItem("userData", JSON.stringify(allData));
};

const getLocal = () => {
  const allLocal = JSON.parse(localStorage.getItem("userData"));
  if (allLocal) {
    nameInput.value = allLocal.userName;
    jobTitleInput.value = allLocal.jobTitle;
    updateOutput();
  }
};

const dateElement = document.getElementById("current-date");
const options = {
  weekday: "long",
  month: "long",
  year: "numeric",
};

const today = new Date();
const day = String(today.getDate()).padStart(2, "0");
const formattedDate = today.toLocaleDateString("id-ID", options);

dateElement.textContent = `${today.toLocaleDateString("id-ID", {
  weekday: "long",
})}, ${day} ${today.toLocaleDateString("id-ID", {
  month: "long",
  year: "numeric",
})}`;

const wrapper = document.querySelector(".wrapper");
const menuBtn = document.querySelector(".menuBtn");
const backBtn = document.querySelector(".backBtn");
const toggleScreen = () => {
  wrapper.classList.toggle("showProfile");
};

menuBtn.addEventListener("click", toggleScreen);
backBtn.addEventListener("click", toggleScreen);

const nameInput = document.getElementById("userName");
const jobTitleInput = document.getElementById("jobTitle");
const btnProfile = document.getElementById("btnProfile");
const btnCancel = document.getElementById("btnCencel");
const output1 = document.getElementById("output1");
const output2 = document.getElementById("output2");

function cancel() {
  nameInput.value = "";
  jobTitleInput.value = "";
}

function updateOutput1() {
  output1.innerHTML = `${nameInput.value}`;
}

function updateOutput2() {
  output2.innerHTML = `${jobTitleInput.value}`;
}

function updateOutput() {
  updateOutput1();
  updateOutput2();
  saveLocal();
}

btnCancel.addEventListener("click", cancel);
btnProfile.addEventListener("click", updateOutput);

window.onload = getLocal;

const taskInput = document.getElementById("taks");
const dateInput = document.getElementById("dateInput");
const priorityInput = document.getElementById("priorityInput");
const addTaskButton = document.getElementById("addTask");
const cancelTaskButton = document.getElementById("cancelTask");
const todoList = document.getElementById("todoList");
const doneList = document.getElementById("doneList");
const deleteAllTasksButton = document.getElementById("deleteAllTasks");
const totalTasks = document.getElementById("totalTasks");

function clearInputs() {
  taskInput.value = "";
  dateInput.value = "";
  priorityInput.value = "Low"; 
}

function isOverdue(dueDate) {
  const today = new Date();
  const due = new Date(dueDate);
  return due < today;
}

function saveToLocalStorage() {
  const todoTasks = Array.from(todoList.querySelectorAll("tr")).map((row) => ({
    taskText: row.children[0].textContent,
    dueDate: row.children[1].textContent,
    priority: row.children[2].textContent,
  }));

  const doneTasks = Array.from(doneList.querySelectorAll("li")).map((li) => ({
    taskDetails: li.querySelector("span").textContent,
  }));

  localStorage.setItem("todoTasks", JSON.stringify(todoTasks));
  localStorage.setItem("doneTasks", JSON.stringify(doneTasks));
}

function loadFromLocalStorage() {
  const todoTasks = JSON.parse(localStorage.getItem("todoTasks")) || [];
  const doneTasks = JSON.parse(localStorage.getItem("doneTasks")) || [];

  todoTasks.forEach(({ taskText, dueDate, priority }) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${taskText}</td>
      <td>${dueDate}</td>
      <td>${priority}</td>
      <td><input type="checkbox" class="markDone"></td>
      <td>
        <button class="editTask">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                </svg>
            </button>
            <button class="deleteTask">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
            </button>
      </td>
    `;

    if (isOverdue(dueDate)) {
      row.classList.add("overdue");
    }

    todoList.appendChild(row);
    updateTotalTasks();
  });

  doneTasks.forEach(({ taskDetails }) => {
    const doneItem = document.createElement("li");
    doneItem.innerHTML = `
      <span style="text-decoration: line-through;">${taskDetails}</span>
      <input type="checkbox" class="markDone" checked>
    `;
    doneList.appendChild(doneItem);
  });
}

function updateTotalTasks() {
  const count = todoList.querySelectorAll("tr").length;
  totalTasks.textContent = count;
}

function addTaskToList(taskText, dueDate, priority) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${taskText}</td>
      <td>${dueDate}</td>
      <td>${priority}</td>
      <td><input type="checkbox" class="markDone"></td>
      <td>
        <button class="editTask">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                </svg>
            </button>
            <button class="deleteTask">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
            </button>
      </td>
    `;

    if (isOverdue(dueDate)) {
      row.classList.add("overdue");
    }

    todoList.appendChild(row);
    saveToLocalStorage();
    clearInputs();
    updateTotalTasks();
}

addTaskButton.addEventListener("click", function () {
  const taskText = taskInput.value.trim();
  const dueDate = dateInput.value;
  const priority = priorityInput.value;

  if (taskText && dueDate) {
    const row = document.createElement("tr");
    row.innerHTML = `
   <td>${taskText}</td>
      <td>${dueDate}</td>
      <td>${priority}</td>
      <td><input type="checkbox" class="markDone"></td>
      <td>
        <button class="editTask">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                </svg>
            </button>
            <button class="deleteTask">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
            </button>
      </td>
    `;

    if (isOverdue(dueDate)) {
      row.classList.add("overdue");
    }

    todoList.appendChild(row);
    saveToLocalStorage();
    clearInputs();
    updateTotalTasks();
  } else {
    alert("Please fill in the task and due date.");
  }
});

cancelTaskButton.addEventListener("click", function () {
  clearInputs(); 
});

todoList.addEventListener("change", function (event) {
  if (event.target.classList.contains("markDone")) {
    const row = event.target.closest("tr");
    const taskText = row.children[0].textContent;
    const dueDate = row.children[1].textContent;
    const priority = row.children[2].textContent;

    const doneItem = document.createElement("li");
    doneItem.innerHTML = `
            <span style="text-decoration: line-through;">
                ${taskText} (Batas Waktu: ${dueDate}, Priority: ${priority}), Selesai
            </span>
            <input type="checkbox" class="markDone" checked>
        `;

    if (isOverdue(dueDate)) {
      row.classList.add("overdue");
    }

    doneList.appendChild(doneItem);
    todoList.removeChild(row);
    saveToLocalStorage();
    updateTotalTasks();
  }
});

doneList.addEventListener("change", function (event) {
  if (event.target.classList.contains("markDone") && !event.target.checked) {
    const listItem = event.target.closest("li");
    const taskDetails = listItem.querySelector("span").textContent.match(/(.*) \(Batas Waktu: (.*), Priority: (.*)\)/);
    const taskText = taskDetails[1].trim();
    const dueDate = taskDetails[2].trim();
    const priority = taskDetails[3].trim();

    const row = document.createElement("tr");
    row.innerHTML = `
    <td>${taskText}</td>
      <td>${dueDate}</td>
      <td>${priority}</td>
      <td><input type="checkbox" class="markDone"></td>
      <td>
        <button class="editTask">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                  <path d="M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"/>
                </svg>
            </button>
            <button class="deleteTask">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                  <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"/>
                </svg>
            </button>
      </td>
    `;

    if (isOverdue(dueDate)) {
      row.classList.add("overdue");
    }

    todoList.appendChild(row);
    doneList.removeChild(listItem);
    saveToLocalStorage();
    updateTotalTasks();
  }
});

todoList.addEventListener("click", function (event) {
  let button = event.target.closest(".editTask, .deleteTask"); // Mengambil tombol terdekat
  if (!button) return;

  const row = button.closest("tr");

  if (button.classList.contains("deleteTask")) {
    todoList.removeChild(row);
    saveToLocalStorage();
    updateTotalTasks();
  }

  if (button.classList.contains("editTask")) {
    const taskText = row.children[0].textContent;
    const dueDate = row.children[1].textContent;
    const priority = row.children[2].textContent;

    taskInput.value = taskText;
    dateInput.value = dueDate;
    priorityInput.value = priority;

    todoList.removeChild(row);
    updateTotalTasks();
  }
});

doneList.addEventListener("click", function (event) {
  let button = event.target.closest(".deleteTask"); 
  if (!button) return;

  const listItem = button.closest("li");
  doneList.removeChild(listItem);
  saveToLocalStorage();
});

deleteAllTasksButton.addEventListener("click", function () {
  if (confirm("Are you sure you want to delete all tasks?")) {
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild);
    }
    while (doneList.firstChild) {
      doneList.removeChild(doneList.firstChild);
    }
    saveToLocalStorage();
    updateTotalTasks();
  }
});

window.addEventListener("load", function () {
  loadFromLocalStorage();
  updateTodoCount();
});
let taskList = [
  //   {
  // id:1
  //     taskInput: "task 1",
  //     asigneeInput: "ayah",
  //     doneState: false,
  //   },
  //   {
  //     taskInput: "task 2",
  //     asigneeInput: "ameen",
  //     doneState: false,
  //   },
];
let count = 0;
let genID = generateID();
let text = "";
let searchedResult = [];
let taskInput = "";
let asigneeInput = "";

let task = document.getElementById("task");
let asignee = document.getElementById("assignee");
let submitTask = document.getElementById("submitTask");
let search = document.getElementById("search");
let taskDisplay = document.getElementById("taskDisplay");
let counterDone = document.getElementById("counterDone");
let counterUnDone = document.getElementById("counterUnDone");

task.addEventListener("keyup", function taskHandler(event) {
  taskInput = event.target.value;
});
asignee.addEventListener("keyup", function assigneeHandler(event) {
  asigneeInput = event.target.value;
});
submitTask.addEventListener("click", function addTaskHandler(event) {
  event.preventDefault();
  addTask(taskInput, asigneeInput);
  clearInput();
  displayTask(taskList);
  displayCounter(taskList);
});
search.addEventListener("keyup", function searchHandler(event) {
  searchedResult = [];
  if (event.target.value == "") {
    displayTask(taskList);
    displayCounter(taskList);
    return;
  }
  taskList.forEach((item) => {
    if (
      item.taskInput.includes(event.target.value) ||
      item.asigneeInput.includes(event.target.value)
    ) {
      searchedResult.push(item);
    }
  });
  displayTask(searchedResult);
});
function changeDoneHandler(event, taskList, id) {
  taskList.forEach((item) => {
    if (item.id === id) {
      item.doneState = !item.doneState;
    }
  });
  displayTask(taskList);
  displayCounter(taskList);
}
function deleteHandler(taskList, id) {
  taskList.forEach((item, idx) => {
    if (item.id === id) {
      taskList.splice(idx, 1);
    }
  });
  displayTask(taskList);
  displayCounter(taskList);
}
function addTask(taskInput, asigneeInput) {
  let objTask = {
    id: genID.next().value,
    taskInput,
    asigneeInput,
    doneState: false,
  };
  taskList.push(objTask);
}
function clearInput() {
  task.value = "";
  asignee.value = "";
  taskInput = "";
  asigneeInput = "";
}
function displayTask(list) {
  taskDisplay.innerHTML = "";
  list.forEach((item) => {
    const taskParag = document.createElement("p");
    taskParag.innerHTML = item.taskInput;
    const assigneeParag = document.createElement("p");
    assigneeParag.innerHTML = item.asigneeInput;

    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
    deleteBtn.setAttribute("id", "deleteTask");
    deleteBtn.addEventListener("click", () => deleteHandler(list, item.id));

    const btnDoneState = document.createElement("button");
    btnDoneState.innerHTML = item.doneState ? (
      `<i class="fa-solid fa-circle-check"></i>`
    ) : (
      `<i class="fa-regular fa-circle-check"></i>`
    );
    btnDoneState.addEventListener('click',(event)=> changeDoneHandler(event, list, item.id))

    const newDiv = document.createElement("div");
    newDiv.appendChild(taskParag);
    newDiv.appendChild(assigneeParag);
    newDiv.appendChild(deleteBtn);
    newDiv.appendChild(btnDoneState);

    const newList = document.createElement("li");
    newList.appendChild(newDiv);
    taskDisplay.appendChild(newList);

    // text += `
    // <div id="changeDoneState" onClick="changeDoneHandler(event,${item.id})">
    // ${
    //     item.doneState
    //     ? `<i class="fa-solid fa-circle-check"></i>`
    //     : `<i class="fa-regular fa-circle-check"></i>`
    // }
    // </div>
    // `;
  });
  //   taskDisplay.innerHTML = text;
}
function displayCounter(taskList) {
  let countUnDone = 0;
  let countDone = 0;
  taskList?.forEach((item) => {
    if (item.doneState) {
      countDone++;
    } else {
      countUnDone++;
    }
  });
  counterDone.innerHTML = countDone;
  counterUnDone.innerHTML = countUnDone;
}
function* generateID() {
  while (true) {
    yield count++;
  }
}

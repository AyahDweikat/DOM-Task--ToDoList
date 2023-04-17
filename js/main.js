let task = document.getElementById("task");
let asignee = document.getElementById("assignee");
let submitTask = document.getElementById("submitTask");
let search = document.getElementById("search");
let taskList = [];
taskList = getFromLocalStorage();
storeInLocal(taskList);

submitTask.addEventListener("click", function addTaskHandler(event) { //done
  event.preventDefault();
  let taskInput = task.value;
  let asigneeInput = asignee.value;
  addTask(taskInput, asigneeInput);
  clearInput();
  displayTask(taskList);
  displayCounter(taskList);
});
search.addEventListener("keyup", (event) => {
  //done
  let value = event.target.value;
  searchHandler(value, taskList);
});
function searchHandler(value, taskList) {
  //done
  let searchedResult = [];
  if (value == "") {
    displayTask(taskList);
    displayCounter(taskList);
    return;
  }
  searchedResult = taskList.filter((item) => {
    return (
      item.taskInput.toLowerCase().includes(value.toLowerCase()) ||
      item.asigneeInput.toLowerCase().includes(value.toLowerCase())
    );
  });
  displayTask(searchedResult);
  displayCounter(searchedResult);
}
function getNumTasks(taskList) { //done
  let taskNum = document.getElementById("taskNum");
  let node = taskNum.firstChild;
  taskNum.removeChild(node);
  taskNum.appendChild(document.createTextNode(`${taskList.length} Tasks `));
}
function changeDoneHandler(event, list, id) { 
  //done
  let _state = "";
  let { doneState } = list.find((item) => {
    return item.id === id;
  });
  _state = !doneState;
  let _taskList = list.map((item) => {
    if (item.id === id) {
      _state = !item.doneState;
    }
  });
  taskList.forEach((item) => {
    if (item.id === id) {
      item.doneState = _state;
    }
  });
  _taskList.forEach((item) => {
    if (item.id === id) {
      item.doneState = _state;
    }
  });
  taskList = _taskList;
  storeInLocal(taskList);
  searchHandler(search.value, taskList);
  // _taskList.forEach((item) => {
  //   if (item.id === id) {
  //     item.doneState = _state;
  //   }
  // });
  // storeInLocal(taskList);
  // displayTask(_taskList);
  // displayCounter(_taskList);
}
function deleteHandler(list, id) {
  //done
  let finalTaskList = list.filter((item) => {
    return item.id !== id;
  });
  taskList = finalTaskList;
  storeInLocal(taskList);
  searchHandler(search.value, taskList);
}
function addTask(taskInput, asigneeInput) { //done
  let genID = generateID();
  let objTask = {
    id: genID.next().value,
    taskInput,
    asigneeInput,
    doneState: false,
  };
  taskList.push(objTask);
  storeInLocal(taskList);
}
function clearInput() { //done
  task.value = "";
  asignee.value = "";
}
function storeInLocal(list) { //done
  localStorage.setItem("taskList", JSON.stringify(list));
}
function getFromLocalStorage() { //done
  let _list = JSON.parse(localStorage.getItem("taskList"));
  if (_list == null) {
    _list = [];
  }
  displayTask(_list);
  displayCounter(_list);
  return _list;
}
function displayTask(list) {
  //done
  let taskDisplay = document.getElementById("taskDisplay");
  taskDisplay.innerHTML = "";
  list.forEach((item) => {
    let taskParag = document.createElement("p");
    let textP1 = document.createTextNode(item.taskInput);
    taskParag.appendChild(textP1);

    let assigneeSpan = document.createElement("span");
    let textP2 = document.createTextNode(item.asigneeInput);
    assigneeSpan.appendChild(textP2);

    const deleteBtn = document.createElement("button");
    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid");
    deleteIcon.classList.add("fa-trash");
    deleteIcon.style.color = "#FF0000";
    deleteBtn.appendChild(deleteIcon);

    deleteBtn.setAttribute("id", "deleteTask");
    deleteBtn.addEventListener("click", () => displayAlert(list, item.id));
    deleteBtn.classList.add("deleteBtn");

    const btnDoneState = document.createElement("button");
    btnDoneState.classList.add("btnDoneState");
    let stateIcon = document.createElement("i");
    stateIcon.classList.add(item.doneState ? "fa-solid" : "fa-regular");
    stateIcon.classList.add(item.doneState ? "fa-circle-check" : "fa-circle");
    stateIcon.style.color = "#14bba6";
    btnDoneState.appendChild(stateIcon);
    btnDoneState.addEventListener("click", (event) =>
      changeDoneHandler(event, taskList, item.id)
    );
    btnDoneState.classList.add(item.doneState ? "doneBtn" : "undoneBtn");

    const btnEdit = document.createElement("button");
    btnEdit.classList.add("btnEdit");
    let editIcon = document.createElement("i");
    editIcon.classList.add("fa-solid");
    editIcon.classList.add("fa-pen-to-square");
    btnEdit.appendChild(editIcon);

    btnEdit.addEventListener("click", () => {
      let editTaskInput = document.createElement("input");
      taskParag.replaceChild(editTaskInput, textP1);
      editTaskInput.value = item.taskInput;
      editTaskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          item.taskInput = editTaskInput.value;
          let _taskList = taskList.map((ele) => {
            if (ele.id === item.id) {
              return {
                id: item.id,
                taskInput: editTaskInput.value,
                asigneeInput: item.asigneeInput,
                doneState: item.doneState,
              };
            } else {
              return ele;
            }
          });
          textP1 = document.createTextNode(editTaskInput.value);
          taskParag.replaceChild(textP1, editTaskInput);
          taskList = _taskList;
          storeInLocal(taskList);
        }
      });
    });

    btnEdit.disabled = item.doneState;
    const divOne = document.createElement("div");
    const divTwo = document.createElement("div");
    const divThree = document.createElement("div");
    divOne.appendChild(btnDoneState);
    divTwo.appendChild(taskParag);
    divTwo.appendChild(assigneeSpan);
    divThree.appendChild(btnEdit);
    divThree.appendChild(deleteBtn);
    divThree.classList.add("del-edit-btn");
    const newList = document.createElement("li");
    newList.classList.add(item.doneState ? "done-task" : "undone-task");
    newList.appendChild(divOne);
    newList.appendChild(divTwo);
    newList.appendChild(divThree);
    taskDisplay.appendChild(newList);
    getNumTasks(list)
  });
  getNumTasks(list);
}
function displayAlert(list, id) {
  //done
  let delBtn = document.getElementById("delBtn");
  let closeBtn = document.getElementById("closeBtn");
  let shadowModal = document.getElementById("shadowModal");
  shadowModal.hidden = false;
  function deleteItem() {
    deleteHandler(taskList, id);
    shadowModal.hidden = true;
  }
  delBtn.addEventListener("click", deleteItem);
  closeBtn.addEventListener("click", (event) => {
    delBtn.removeEventListener("click", deleteItem);
    shadowModal.hidden = true;
  });
  shadowModal.addEventListener("click", (event) => {
    delBtn.removeEventListener("click", deleteItem);
    let modal = event.target.closest("#deleteModal");
    if (modal) {
      return;
    }
    shadowModal.hidden = true;
  });
}
function displayCounter(taskList) { //done
  let counterDone = document.getElementById("counterDone");
  let counterUnDone = document.getElementById("counterUnDone");
  let _countUnDone = 0;
  let _countDone = 0;
  let doneArr = taskList.filter((item) => {
    return item.doneState;
  });
  _countDone = doneArr.length;
  _countUnDone = taskList.length - _countDone;
  let node1 = counterDone.firstChild;
  counterDone.removeChild(node1);
  counterDone.appendChild(document.createTextNode(_countDone));
  let node2 = counterUnDone.firstChild;
  counterUnDone.removeChild(node2);
  counterUnDone.appendChild(document.createTextNode(_countUnDone));
}
function* generateID() { //done
  while (true) {
    yield Math.random().toString(36).slice(2);
  }
}

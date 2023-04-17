
let task = document.getElementById("task");
let asignee = document.getElementById("assignee");
let submitTask = document.getElementById("submitTask");
let search = document.getElementById("search");
let taskList =[];
taskList = getFromLocalStorage();
storeInLocal(taskList)
// taskList = getFromLocalStorage() ;

submitTask.addEventListener("click", function addTaskHandler(event) {
  //done
  event.preventDefault();
  let taskInput = task.value;
  let asigneeInput = asignee.value;
  addTask(taskInput, asigneeInput);
  clearInput();
  displayTask(taskList);
  displayCounter(taskList);
});
search.addEventListener("keyup", function searchHandler(event) {
  let searchedResult = [];
  if (event.target.value == "") {
    displayTask(taskList);
    displayCounter(taskList);
    return;
  }
  taskList.forEach((item) => {
    if (
      item.taskInput.toLowerCase().includes(event.target.value.toLowerCase()) ||
      item.asigneeInput.toLowerCase().includes(event.target.value.toLowerCase())
    ) {
      searchedResult.push(item);
    }
  });
  displayTask(searchedResult);
  displayCounter(searchedResult);
});
function getNumTasks(taskList) {
  //done
  let taskNum = document.getElementById("taskNum");
  let node = taskNum.firstChild;
  taskNum.removeChild(node);
  taskNum.appendChild(document.createTextNode(`${taskList.length} Tasks `));
}
function changeDoneHandler(event, _taskList, id) {
  // @this // loops to switch state
  let _state = "";
  taskList.forEach((item) => {
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
  storeInLocal(taskList);
  displayTask(_taskList);
  displayCounter(_taskList);
}
function deleteHandler(_taskList, id) {
  _taskList.forEach((item, idx) => {
    if (item.id === id) {
      _taskList.splice(idx, 1);
    }
  });
  taskList.forEach((item, idx) => {
    if (item.id === id) {
      taskList.splice(idx, 1);
    }
  });
  storeInLocal(taskList);
  displayTask(_taskList);
  displayCounter(_taskList);
}
function addTask(taskInput, asigneeInput) {
  //done
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
function clearInput() {
  //done
  task.value = "";
  asignee.value = "";
}
function storeInLocal(list) {
  //done
  localStorage.setItem("taskList", JSON.stringify(list));
}
function getFromLocalStorage() {
  //done
  let _list = JSON.parse(localStorage.getItem("taskList"));
  if(_list ==null){
    _list=[]
  }
  displayTask(_list);
  displayCounter(_list);
  return _list;
}
function displayTask(list) {
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
      changeDoneHandler(event, list, item.id)
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
            if(ele.id === item.id){
              return {
                id: item.id,
                taskInput: editTaskInput.value,
                asigneeInput: item.asigneeInput,
                doneState: item.doneState,
              }
            } else {
              return ele;
            }
          });
          textP1 = document.createTextNode(editTaskInput.value);
          taskParag.replaceChild(textP1, editTaskInput);
          taskList= _taskList;
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
  });
  getNumTasks(list);
}
function displayAlert(list, id) {
  let delBtn = document.getElementById("delBtn");
  let closeBtn = document.getElementById("closeBtn");
  let exampleModal = document.getElementById("exampleModal");
  exampleModal.hidden = false;
  delBtn.addEventListener("click", () => {
    deleteHandler(list, id);
    exampleModal.hidden = true;
  });
  // @this id also delete function remain till i change id;
  closeBtn.addEventListener("click", () => {
    exampleModal.hidden = true;
    id = -1;
  });
  //@this alert delete show and hide when clicking out
  window.addEventListener("click", (event) => {
    if (
      event.target.tagName !== "I" &&
      event.target.tagName !== "BUTTON" &&
      !exampleModal.hidden
    ) {
      exampleModal.hidden = true;
      id = -1;
    }
  });
}
function displayCounter(taskList) {
  //done
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
function* generateID() {
  //done
  while (true) {
    yield Math.random().toString(36).slice(2);
  }
}

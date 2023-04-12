let taskList = document.getElementById('demo');
// let taskInput = document.getElementById('task').innerHTML
// console.log(taskInput)

















let tasks ="";
for(let i=0; i<5; i++){
    tasks += `
    <li>${i}</li>
    `
}
taskList.innerHTML =  tasks;


// function* gen() {
//     let ask1 = yield "2 + 2 = ?";
  
//     alert(ask1); // 4
  
//     let ask2 = yield "3 * 3 = ?"
  
//     alert(ask2); // 9
//   }
  
//   let generator = gen();
  
//   alert( generator.next().value ); // "2 + 2 = ?"
  
//   alert( generator.next(4).value ); // "3 * 3 = ?"
  
//   alert( generator.next(9).done );
  
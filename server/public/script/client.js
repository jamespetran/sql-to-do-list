console.log('js');

$(onReady);

function onReady() {
      console.log('JQ');
      // event handlers
      $('#new-task').on('click', todoPost);
      $('#taskTable').on('change', '.isNotDone', todoPut);
      // GET & render init
      todoGet();
}; // end onReady

// GET 
function todoGet() {
      console.log('in GET');
      $.ajax({
            method: 'GET',
            url: '/todo',
      }).then((res) => {
            console.log(res);
            render(res);
      }).catch((err) => {
            console.log('error in GET /todo', err);
      })
} // end todoGet

// POST 
function todoPost() {
      console.log('in POST');
      let newTaskInput = prompt("New task name:");
      console.log('adding new todo:', newTaskInput);
      let newTaskInputObject = {
            task: newTaskInput
      }

      $.ajax({
            method: 'POST',
            url: '/todo',
            data: newTaskInputObject 
      }).then((res) => {
            console.log('in POST /todo', res);
            todoGet(); // GETs and renders todo list
      }).catch((err) => {
            console.log('error in POST /todo', err);
      })
}
// PUT 
function todoPut() {
      let id = $(this).parent().parent().data('id');
      console.log('in PUT set complete for', id);
      $.ajax({
            method: 'PUT',
            url: `/todo/edit/${id}`
      }).then((res) => {
            console.log(`PUT /todo/edit/${id} complete`, res);
            todoGet(); // GETs and renders todo list
      }).catch((err) => {
            console.log(`error in PUT /todo/edit/${id}`, err);
      });

} // end todoPut

// DELETE 
function todoDelete() {
      console.log('in DELETE');

} // end todoDelete

// RENDER TO DOM 

function render(response) {
      console.log('in render');
      $('#taskTable').empty();
      console.log(response);
      for (const task of response) {
            let isDone, time, trClass, rowspan;
            if (task.isDone) {
                  isDone = `
                  <input type="checkbox" 
                  class="checkbox isDone" 
                  onclick="this.checked=!this.checked;" 
                  checked>`;
                  time = `Completed: ${task.whenComplete}`;
                  trClass = ' table-success';
                  rowspan=2;
            } else {
                  isDone = `<input type="checkbox" class="checkbox isNotDone">`;
                  time = '';
                  trClass = '';
                  rowspan=1;
            }
            $('#taskTable').append(`
            <tr class="tr-stripe${trClass} " data-id="${task.id}">
                  <td class="td taskname" data-name="${task.taskname}"> ${isDone} ${task.taskname} </td>
                  <td class="td complete fit" data-timeComplete="${task.whenComplete}"> ${time} </td>
            </tr>
            `);
      }
} // end render
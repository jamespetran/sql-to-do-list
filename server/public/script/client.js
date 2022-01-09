console.log('js');

$(onReady);

function onReady() {
      console.log('JQ');
      // event handlers
      $('#new-task').on('click', todoPost);
      $('#taskTable').on('change', '.isNotDone', todoPut);
      $('#taskTable').on('click', '.deleteBtn', todoDelete);

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
      let id = $(this).parents('tr').data('id');
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
      let id = $(this).parents('tr').data('id');

      console.log('in DELETE', id);
      Swal.fire({
            title: 'Delete item?',
            text: 'Really delete this to-do list item?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Delete'
      }).then((result) => {
            if (result.isConfirmed) {
                  $.ajax({
                        method: 'DELETE',
                        url: `/todo/delete/${id}`,
                  }).then((res) => {
                        console.log('delete successful for task', id);
                        todoGet();
                  }).catch((err) => {
                        console.log(`error:`,err);
                  })
            };
      });
} // end todoDelete

// RENDER TO DOM 

function render(response) {
      console.log('in render');
      $('#taskTable').empty();
      console.log(response);
      for (const task of response) {
            let checkbox, time, green, colspan;
            if (task.isDone) {
                  checkbox = `
                  <input type="checkbox" 
                  class="checkbox isDone" 
                  onclick="this.checked=!this.checked;" 
                  checked>`;
                  time = `Completed: ${task.whenComplete}`;
                  green = ' table-success';
                  colspan = 1;
            } else {
                  checkbox = `<input type="checkbox" class="checkbox isNotDone">`;
                  time = '';
                  green = '';
                  colspan = 2;
            }
            $('#taskTable').append(`
            <tr class="tr-stripe${green}" data-id="${task.id}">
                  <td class="td taskname container" colspan="${colspan}" data-name="${task.taskname}"> 
                        <span class="left-span">${checkbox} ${task.taskname}</span> 
                        <span class="right-span">
                              ${time}
                              <button class="deleteBtn">Delete Task</button>
                        </span>
                  </td>
            </tr>
            `);
      }
} // end render
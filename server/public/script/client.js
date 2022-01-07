console.log('js');

$(onReady);

function onReady() {
      console.log('JQ');
      // append HTML

      // event handlers


      // GET call
      todoGet()
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

}

// POST 
function todoPost() {
      console.log('in POST');

}
// PUT 
function todoPut() {
      console.log('in PUT');

}

// DELETE 
function todoDelete() {
      console.log('in DELETE');

}

// RENDER TO DOM 

function render(response) {
      console.log('in render');
      console.log(response);
      for (const task of response) {
            let isDone, time, trClass;

            if (task.isDone) {
                  isDone = 'Complete!';
                  time = task.whenComplete;
                  trClass = 'table-success';
            } else {
                  isDone = '';
                  time = '';
            }
            

            $('#taskTable').append(`
            <tr class="tr-stripe ${trClass} " data-id="${task.id}">
                  <td class="td" data-name="${task.taskname}"> ${task.taskname} </td>
                  <td class="td" data-bool="${task.isDone}"> ${isDone} </td>
                  <td class="td" data-timeComplete="${task.whenComplete}"> ${time} </td>
            </tr>
            `);

      }


}
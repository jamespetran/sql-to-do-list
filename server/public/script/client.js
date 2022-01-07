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
      
      let result = {
            taskname: 'example task',
            isComplete: false,
            timeCompleted: null,
      }
      render(result);
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

function render(data) {
      console.log('in render');


}
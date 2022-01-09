function testParams(queryParams) {
      // regex allowing a-z, A-Z, 0-9, "-", "/", "\" and "$", 
      // just because I want to allow these ones and to practice regex...
      let taskRX = /^[a-zA-Z\d-///\$]*$/;

      console.log('in testing params');
      console.log('testing taskname', taskRX.test(queryParams[0]), queryParams[0]));
      if (taskRX.test(queryParams[0])) {
            return true
      } else {
            return false
      }
}

module.exports = testParams;
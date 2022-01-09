// vars

const express = require('express');
const todoRouter = express.Router();
const pg = require('pg');
const testParams = require('../module/testParams')

// DB Connection
const config = {
      database: "todo_sql_jan21",
      host: "localhost",
      port: 5432,
}

const pool = new pg.Pool(config);

pool.on('connect', () => {
      console.log('connected to postgres');
});
pool.on('error', (err) => {
      console.log('error connecting to postgres', err);
});

// GET
todoRouter.get('/', (req, res) => {
      console.log('in GET /todo');

      let queryText = `
      SELECT id, taskname, "isDone", TO_CHAR("whenComplete", 'Mon fmDDth YYYY') AS "whenComplete" 
      FROM todo
      ORDER BY "whenComplete" DESC`;

      pool.query(queryText)
            .then((dbRes) => {
                  console.log("GET /todo 👍")
                  res.status(200).send(dbRes.rows); // status: ok
            })
            .catch((err) => {
                  console.log('error in GET /todo', err);
                  res.sendStatus(500); // status: server error
            })
}); // end GET /todo

// POST
todoRouter.post('/', (req, res) => {
      let newTask = req.body.task;
      console.log('adding task', newTask);

      let queryText = `
            INSERT INTO "todo"
                  (taskname, "isDone")
            VALUES ($1, false)
      `;

      let queryParams = [newTask]

      if (!testParams(queryParams)) {
            console.log('Data validation Failed ~🤢~');
            res.sendStatus(400); // status: data validation fail
            return;
      }

      pool.query(queryText, queryParams)
            .then(() => {
                  console.log("POST /todo 👍");
                  res.sendStatus(201); //status: request successful
            })
            .catch((err) => {
                  console.log("POST /todo 👎", err);
                  res.sendStatus(500); // status: server error
            });
}); // end POST /todo

// PUT
todoRouter.put('/edit/:id', (req, res) => {
      console.log(`in PUT /todo/edit/${req.params.id}`);
      let queryText = `
            UPDATE "todo"
            SET   "isDone" = true,
                  "whenComplete" = NOW()
            WHERE id = $1;
      `
      let queryParams = [req.params.id]
      
      // if (opposite(passes test)) === if (fails test):
      if (!testID(queryParams)) {
            console.log('Data validation Failed ~🤢~');
            res.sendStatus(400); // status: data validation fail
            return;
      };

      pool.query(queryText, queryParams)
            .then(() => {
                  res.sendStatus(201) //status: request successful
            })
            .catch((err) => {
                  console.log(`Error in PUT /todo/edit/${req.params.id}`,err)
                  res.sendStatus(500); // status: server error
            });


})

function testID(queryParams) {
      // regex = numbers 0-9 @ one or many digits
      let idRX = /^[0-9]+$/; 
      // if passes test for regex:
      if (idRX.test(queryParams[0])) {
            return true
      } else {
            return false
      }

}


// DELETE


module.exports = todoRouter;
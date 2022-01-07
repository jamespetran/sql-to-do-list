const express = require('express');
const todoRouter = express.Router();
const pg = require('pg');

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

todoRouter.get('/', (req,res) => {
      console.log('in GET /todo');

      let queryText = `
      SELECT id, taskname, "isDone", TO_CHAR("whenComplete", 'HH12:MI AM, Mon fmDDth YYYY') AS "whenComplete" 
      FROM todo
      ORDER BY "isDone" ASC`;

      pool.query(queryText)
      .then((dbRes) => {
            res.send(dbRes.rows);
      })
      .catch((err) => {
            console.log('error in GET /todo', err);
            res.sendStatus(500);
      })
});

// POST

// PUT

// DELETE


module.exports = todoRouter;
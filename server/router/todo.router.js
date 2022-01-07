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
      
});

// POST

// PUT

// DELETE


module.exports = todoRouter;
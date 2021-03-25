const express = require("express");
const app = express();

const PORT = process.env.PORT || 8000;
const DB_CONNECTION = process.env.DB_CONNECTION || 'postgres://itec21user:itec21pass@database-1.cluster-coafmgay0em0.eu-central-1.rds.amazonaws.com:5432/postgres';

const cors = require("cors");
const postgres = require('postgres');
const { v4: uuidv4 } = require('uuid');

app.use(cors());
app.use(express.json());

const success = (res, payload) => {
  return res.status(200).json(payload);
};

const dbConnector = async (req, res, next) => {
  req.sql = postgres(DB_CONNECTION);

  next();
};

app.use(dbConnector);

app.get("/todos", async (req, res, next) => {
  try {
    let todos = [];
    await req.sql`select * from todos`.stream(row => {
      todos.push({
        _id: row.id,
        task: row.body,
        completed: row.completed
      })
    });
    return success(res, todos);
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "failed to get todos" });
  }
});

app.post("/todos", async (req, res, next) => {
  try {

    const item = {
      id: uuidv4(),
      body: req.body.task,
      completed: false
    };

    const todo = await req.sql`
      insert into todos ${req.sql(item, 'id', 'body', 'completed')}
      returning *
    `;

    return success(res, {
      _id: todo[0].id,
      task: todo[0].body,
      completed: todo[0].completed
    });
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "failed to create todo" });
  }
});

app.put("/todos/:id", async (req, res, next) => {
  try {
    const todo = await req.sql`
      update todos set completed = true where id = ${req.params.id}
      returning *
    `;

    return success(res, {
      _id: todo[0].id,
      task: todo[0].body,
      completed: todo[0].completed
    });
  } catch (err) {
    next({ status: 400, message: "failed to update todo" });
  }
});

app.delete("/todos/:id", async (req, res, next) => {
  try {
    await req.sql`delete from todos where id = ${req.params.id}`;

    return success(res, "todo deleted!");
  } catch (err) {
    console.log(err);
    next({ status: 400, message: "failed to delete todo" });
  }
});

app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request"
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

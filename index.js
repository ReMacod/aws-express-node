const path = require("path");
const express = require("express");
require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.DB_PORT,
});

const PORT = process.env.PORT || 5001;

module.exports = pool;

const app = express();
app.use(express.json());

app.get("/", (req, res) =>
  res.json({
    message: "Hello Codelivery 👀, Api running ... for stage and prod",
  })
);

app.get("/users", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result);
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(result.rows);
  }
});

app.post("/users", async (req, res) => {
  try {
    const { name, lastName, email, country } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO users (name, last_name, email, country) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, lastName, email, country]
    );
    return res.json({ data: rows });
  } catch (e) {
    res.json({ error: e.message });
  }
});

//todo naredi put update or create input

//patch spremeni userja

//delete user sample

// get , post - create, put - update or create, patch - update, delete

//CRUD API

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

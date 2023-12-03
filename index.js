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

module.exports = pool;

const app = express();
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

app.listen(process.env.PORT || 5001);
// app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

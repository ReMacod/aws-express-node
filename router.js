const pool = require("./database");
const express = require("express");

const router = express.Router();

router.get("/", (req, res) =>
  res.json({
    message: "Hello Codelivery 👀, Api running ... for stage and prod",
  })
);

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM users");
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    res.json(result.rows);
  }
});

router.post("/", async (req, res) => {
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

router.put("/", async (req, res) => {
  try {
    const { name, lastName, email, country, id } = req.body;
    const { rows } = await pool.query(
      "UPDATE users SET name=$1, last_name=$2, email=$3, country=$4 WHERE id=$5 RETURNING *",
      [name, lastName, email, country, id]
    );
    return res.json({ data: rows });
  } catch (e) {
    res.json({ error: e.message });
  }
});

router.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    const { rows } = await pool.query("DELETE from users WHERE ID = $1", [id]);
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

// todo

// naredi entiteto in router kot users
// entiteta nova tabela

//

module.exports = router;

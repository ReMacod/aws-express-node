const pool = require("../database");
const express = require("express");

const products = express.Router();

const LIMIT = 5;

// /products?page=2&sort=asc&sort_by=price
products.get("/", async (req, res) => {
  const { page, sort, sort_by } = req.query;
  try {
    const { rows } = await pool.query(
      "SELECT * FROM products ORDER BY $1 OFFSET $2 LIMIT $3",
      [sort_by + " " + sort.toUpperCase, LIMIT * (Number(page) - 1), LIMIT]
    );
    res.json({
      data: rows,
    });
  } catch (e) {
    res.json({ error: e.message });
  }
});

products.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (id) {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    res.json(result.rows);
  }
});

products.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { product_name, prod_description, price } = req.body;
    const { rows } = await pool.query(
      "UPDATE products SET product_name=$1, prod_description=$2, price=$3 WHERE id=$4 RETURNING *",
      [product_name, prod_description, price, id]
    );
    return res.json({ data: rows });
  } catch (e) {
    res.json({ error: e.message });
  }
});

products.delete("/", async (req, res) => {
  try {
    const { id } = req.body;
    const { rows } = await pool.query("DELETE from products WHERE ID = $1", [
      id,
    ]);
    return res.json({ data: rows });
  } catch (e) {
    res.json({ error: e.message });
  }
});

module.exports = products;

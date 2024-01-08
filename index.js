const path = require("path");
const express = require("express");
require("dotenv").config();

const userRouter = require("./router/user");
const productsRouter = require("./router/products");

const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());
app.use("/users", userRouter);
app.use("/products", productsRouter);

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));

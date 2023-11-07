import express from "express";
const app = express();
app.get("/", (req, res) =>
  res.json({
    message: "Hello Codelivery 👀, Api running.... and deploy done",
  })
);
app.listen(process.env.PORT || 5001);

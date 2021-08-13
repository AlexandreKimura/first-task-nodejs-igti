import express from "express";
import { promises as fs } from "fs";
import brandRouter from "./routes/brand.js";

global.filename = "car-list.json";

const app = express();
app.use(express.json());

app.use("/marcas", brandRouter);

app.listen(3000, () => {
  try {
    console.log("Server started!");
  } catch (err) {
    console.log(err);
  }
});

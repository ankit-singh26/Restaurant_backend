import express, { response } from "express";
import mongoose from "mongoose";
import { Book } from "./models/bookModels.js";
import booksRoute from "./routes/booksRoute.js";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for CORS
app.use(cors());
// app.use(cors({
//     origin: "http://localhost:3000",
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type'],
// }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/books", booksRoute);

mongoose
  .connect(process.env.mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");

    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

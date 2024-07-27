import express from "express";
import { Book } from "../models/bookModels.js";

const router = express.Router();

// Route for Save a new Book
router.post("/", async (req, res) => {
    try{
        if(!req.body.title || !req.body.author || !req.body.publishYear){
            return res.status(400).send({ message: "All fields are required: title, author, publishYear",});
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send(error.message);
    }
  });

  // Route for Get all Books
router.get("/", async (req, res) => {
    try{
        const books = await Book.find();

        return res.status(200).send({
            count: books.length,
            data: books,
        });
    }catch(error){
        console.log(error.message);
        response.status(500).send(error.message);
    }
  });

  // Route for Get One Book by ID
router.get("/:id", async (req, res) => {
    try{

        const { id } = req.params;
        const book = await Book.findById(id);

        return res.status(200).send(book);
    }catch(error){
        console.log(error.message);
        response.status(500).send(error.message);
    }
  });

  // Route for Update a Book
router.put("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const { title, author, publishYear } = req.body;

        if(!title || !author || !publishYear){
            return res.status(400).send({ message: "All fields are required: title, author, publishYear",});
        }

        const book = await Book.findByIdAndUpdate(
            id,
            { title, author, publishYear },
            { new: true }
        );
        if(!book){
            return res.status(404).send({ message: "Book not found",});
        }
        return res.status(200).send(book);
    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
  });

  // Route for Delete a Book
router.delete("/:id", async (req, res) => {
    try{
        const { id } = req.params;
        const book = await Book.findByIdAndDelete(id);

        if(!book){
            return res.status(404).send({ message: "Book not found",});
        }

        return res.status(200).send({
            message: "Book deleted successfully",});
    }catch(error){
        console.log(error.message);
        res.status(500).send(error.message);
    }
  });

export default router;
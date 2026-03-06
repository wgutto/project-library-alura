import mongoose from "mongoose";
import { authorSchema } from "./Author.js";

// Criando o Schema para um livro
const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    pages: { type: Number },
    price: { type: Number, required: true },
    publisher: { type: String, required: true },
    author: authorSchema
}, {versionKey: false})

const book = mongoose.model("books", bookSchema)

export default book
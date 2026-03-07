import mongoose from "mongoose";

// Criando o Schema para um livro
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "O título do livro é obrigatório"]
    },
    pages: { type: Number },
    price: {
        type: Number,
        required: [true, "O preço é obrigatório"]
    },
    publisher: {
        type: String,
        required: [true, "Identificar a editora é obrigatório"]
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authors",
        required: [true, "Identificar um autor é obrigatório"]
    }
}, { versionKey: false })

const book = mongoose.model("books", bookSchema)

export default book
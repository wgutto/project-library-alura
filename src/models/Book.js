import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate"

// Criando o Schema para um livro
const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "O título do livro é obrigatório"]
    },
    pages: {
        type: Number,
        min: [1, "O número de páginas deve estar entre 1 e 2000. Valor fornecido {VALUE}"],
        max: [2000, "O número de páginas deve estar entre 1 e 2000. Valor fornecido {VALUE}"]
    },
    price: {
        type: Number,
        required: [true, "O preço é obrigatório"]
    },
    publisher: {
        type: String,
        required: [true, "Identificar a editora é obrigatório"],
        enum: {
            values: ["Nova Era", "Editora Horizonte"],
            message: "A editora {VALUE} não é um valor permitido"
        }
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "authors",
        required: [true, "Identificar um autor é obrigatório"],
        autopopulate: true
    }
}, { versionKey: false })

bookSchema.plugin(autopopulate) // plugin para popular o campo auhor automanticamente
const book = mongoose.model("books", bookSchema)

export default book
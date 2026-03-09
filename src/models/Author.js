import mongoose from "mongoose";

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Nome do(a) autor(a) é obrigatório"]
    },
    nationality: { type: String }
}, { versionKey: false })

const authors = mongoose.model("authors", authorSchema)

export { authors, authorSchema }
import express from "express"
import BookController from "../controllers/bookController.js"

const bookRoutes = express.Router()

bookRoutes.get("/livros", BookController.getAllBooks)
bookRoutes.get("/livros/busca", BookController.searchByFilter)
bookRoutes.post("/livros", BookController.registerBook)
bookRoutes.get("/livros/:id", BookController.getBookById)
bookRoutes.delete("/livros/:id", BookController.deleteBook)
bookRoutes.put("/livros/:id", BookController.updateBook)

export default bookRoutes
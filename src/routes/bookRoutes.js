import express from "express"
import BookController from "../controllers/bookController.js"
import { paginate } from "../middlewares/paginate.js"

const bookRoutes = express.Router()

bookRoutes.get("/livros", BookController.getAllBooks, paginate)
bookRoutes.get("/livros/busca", BookController.searchByFilter, paginate)
bookRoutes.post("/livros", BookController.registerBook)
bookRoutes.get("/livros/:id", BookController.getBookById)
bookRoutes.delete("/livros/:id", BookController.deleteBook)
bookRoutes.put("/livros/:id", BookController.updateBook)

export default bookRoutes
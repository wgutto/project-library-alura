import express from "express"
import authorController from "../controllers/authorController.js"

const authorRoutes = express.Router()

authorRoutes.get("/autores", authorController.getAllAuthors)
authorRoutes.get("/autores/:id", authorController.getAuthorById)
authorRoutes.post("/autores", authorController.registerAuthor)
authorRoutes.delete("/autores/:id", authorController.deleteAuthor)
authorRoutes.put("/autores/:id", authorController.updateAuthor)

export default authorRoutes
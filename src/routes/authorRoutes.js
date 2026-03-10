import express from "express"
import authorController from "../controllers/authorController.js"
import { paginate } from "../middlewares/paginate.js"

const authorRoutes = express.Router()

authorRoutes.get("/autores", authorController.getAllAuthors, paginate)
authorRoutes.get("/autores/:id", authorController.getAuthorById)
authorRoutes.post("/autores", authorController.registerAuthor)
authorRoutes.delete("/autores/:id", authorController.deleteAuthor)
authorRoutes.put("/autores/:id", authorController.updateAuthor)

export default authorRoutes
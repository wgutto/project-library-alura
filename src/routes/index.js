import express from "express"
import bookRoutes from "./bookRoutes.js"
import authorRoutes from "./authorRoutes.js"

const routes = express.Router()

routes.use(bookRoutes)
routes.use(authorRoutes)

export default routes
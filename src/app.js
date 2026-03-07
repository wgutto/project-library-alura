import express from "express"
import { conectDatabase } from "./config/dbConnect.js"
import routes from "./routes/index.js"
import errors from "./middlewares/errors.js"

const connection = await conectDatabase()

connection.on("error", (error) => { // funcao que verifica se houve erro na conexao com o banco de dados
    console.error("Erro na CONNECTION ", error)
})

const app = express() // instanciando o Express
app.use(express.json()) // middleware que vai parsear as req para json
app.use(routes)
app.use(errors)

export default app

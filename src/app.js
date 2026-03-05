import express from "express"
import { conectDatabase } from "./config/dbConnect.js"

const connection = await conectDatabase()

connection.on("error", (error) => {
    console.error("Erro na CONNECTION ", error)
})

connection.once("open", () => {
    console.log("Conexao com o banco feita com sucesso")
})


const app = express()
app.use(express.json()) // middleware que vai parsear as req para json

let livros = [
    {id: 1, title: "Harry Potter"},
    {id: 2, title: "Need for Speed"}
]

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Curso de Node.js"
    })
})

app.get("/livros", (req, res) => {
    res.status(200).json({
        livros: livros
    })
})

app.get("/livros/:id", (req, res) => {
    const { id } = req.params

    const livro = livros.filter((item) => item.id === Number(id))

    if(livro.length <= 0) return res.status(401).send("Livro nao encontrado")

    res.status(200).json({
        livro: livro
    })

})

app.post("/livros", (req, res) => {
    const body = req.body
    livros.push(body)

    res.status(201).send("Livro cadastrado com sucesso")
})

app.put("/livros/:id", (req, res) => {
    const { id } = req.params
    const { title } = req.body

    const index = livros.findIndex((item) => item.id === Number(id))

    livros[index] = {...livros[index], title: title}

    res.status(200).json(livros)
})

app.delete("/livros/:id", (req, res) => {
    const { id } = req.params

    livros = livros.filter((item) => item.id !== Number(id))

    res.status(200).json(livros)
})

export default app

import ErrorNotFound from "../errors/ErrorNotFound.js"
import { authors, book } from "../models/index.js"

class BookController {
    static getAllBooks = async (req, res, next) => {
        try {
            const listBooks = book.find({}).populate("author")

            req.result = listBooks

            next()
        } catch (error) {
            console.error(`Erro ao buscar livros: ${error.message}`)

            next(error)
        }
    }

    static registerBook = async (req, res, next) => {
        try {
            const newBook = req.body

            const bookRegistered = await book.create(newBook)

            return res.status(201).json({
                message: "Livro cadastrado com sucesso",
                livro: bookRegistered
            })
        } catch (error) {
            console.error(`Erro ao cadastrar livro: ${error.message}`)

            next(error)
        }
    }

    static getBookById = async (req, res, next) => {
        try {
            const { id } = req.params

            const bookFound = await book.findById(id)

            if (!bookFound) return next(new ErrorNotFound("ID do livro não foi encontrado"))

            return res.status(200).json(bookFound)
        } catch (error) {
            console.error(`Erro ao buscar um livro: ${error.message}`)

            next(error)
        }
    }

    static updateBook = async (req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body

            const bookUpdated = await book.findByIdAndUpdate(id, body)

            if (!bookUpdated) return next(new ErrorNotFound("ID do livro não foi encontrado"))

            return res.status(200).json({
                message: "Livro atualizado com sucesso"
            })
        } catch (error) {
            console.error(`Erro ao atualizar um livro: ${error.message}`)

            next(error)
        }
    }

    static deleteBook = async (req, res, next) => {
        try {
            const { id } = req.params

            const bookDeleted = await book.findByIdAndDelete(id)

            if (!bookDeleted) return next(new ErrorNotFound("ID do livro não foi encontrado"))

            return res.status(200).json({
                message: "Livro deletado com sucesso"
            })
        } catch (error) {
            console.error(`Erro ao deletar um livro: ${error.message}`)

            next(error)
        }
    }

    static searchByFilter = async (req, res, next) => {
        try {
            const search = await searchProcesses(req.query)

            if (!search) return res.status(200).send([])

            const booksFound = book.find(search).populate("author")

            req.result = booksFound

            next()
        } catch (error) {
            console.error(`Erro ao buscar editora de um livro: ${error.message}`)

            next(error)
        }
    }
}

const searchProcesses = async (paramsQuery) => {
    const { title, publisher, minPages, maxPages, nameAuthor } = paramsQuery

    let search = {}

    if (title) search.title = { $regex: title, $options: "i" }
    if (publisher) search.publisher = { $regex: publisher, $options: "i" }

    if (minPages || maxPages) search.pages = {}

    if (minPages) search.pages.$gte = minPages
    if (maxPages) search.pages.$lte = maxPages

    if (nameAuthor) {
        const authorFound = await authors.findOne({
            name: nameAuthor
        })

        if (!authorFound) return null

        const authorID = authorFound._id

        search.author = authorID
    }

    return search
}

export default BookController
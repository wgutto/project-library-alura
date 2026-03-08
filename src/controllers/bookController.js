import ErrorNotFound from "../errors/ErrorNotFound.js"
import book from "../models/Book.js"

class BookController {
    static getAllBooks = async (req, res, next) => {
        try {
            const listBooks = await book.find({}).populate("author")

            return res.status(200).json(listBooks)
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

            if(!bookUpdated) return next(new ErrorNotFound("ID do livro não foi encontrado"))

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

            if(!bookDeleted) return next(new ErrorNotFound("ID do livro não foi encontrado"))

            return res.status(200).json({
                message: "Livro deletado com sucesso"
            })
        } catch (error) {
            console.error(`Erro ao deletar um livro: ${error.message}`)

            next(error)
        }
    }

    static searchByPublisher = async (req, res, next) => {
        try {
            const publisher = req.query.publisher

            const booksFound = await book.find({
                publisher: publisher
            })

            return res.status(200).json(booksFound)
        } catch (error) {
            console.error(`Erro ao buscar editora de um livro: ${error.message}`)
            
            next(error)
        }
    }
}

export default BookController
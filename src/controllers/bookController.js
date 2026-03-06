import book from "../models/Book.js"
import { author } from "../models/Author.js"

class BookController {
    static async getAllBooks(req, res) {
        try {
            const listBooks = await book.find({})

            return res.status(200).json(listBooks)
        } catch (error) {
            console.error(`Erro ao buscar livros: ${error.message}`)
            return res.status(500).json({
                message: "Erro interno no servidor"
            })
        }
    }

    static async registerBook(req, res) {
        const newBook = req.body
        try {
            const authorFound = await author.findById(newBook.author)

            const bookCompleted = {...newBook, author: {...authorFound.toObject()}}

            const bookRegistered = await book.create(bookCompleted)

            return res.status(201).json({
                message: "Livro cadastrado com sucesso",
                livro: bookRegistered
            })
        } catch (error) {
            console.error(`Erro ao cadastrar livro: ${error.message}`)
            return res.status(500).json({
                message: "Erro interno no servidor"
            })
        }
    }

    static async getBookById(req, res) {
        try {
            const { id } = req.params

            const bookFound = await book.findById(id)

            if (!bookFound) return res.status(400).json({
                message: "Livro nao foi encontrado"
            })

            return res.status(200).json(bookFound)
        } catch (error) {
            console.error(`Erro ao buscar um livro: ${error.message}`)
            return res.status(500).json({
                message: "Erro interno no servidor"
            })
        }
    }

    static async updateBook(req, res) {
        try {
            const { id } = req.params
            const body = req.body

            const bookUpdated = await book.findByIdAndUpdate(id, body)

            if (!bookUpdated) return res.status(400).json({
                message: "Erro ao atualizar o livro"
            })

            return res.status(200).json({
                message: "Livro atualizado com sucesso"
            })
        } catch (error) {
            console.error(`Erro ao atualizar um livro: ${error.message}`)
            return res.status(500).json({
                message: "Erro interno no servidor"
            })
        }
    }

    static async deleteBook(req, res) {
        try {
            const { id } = req.params

            const bookDeleted = await book.findByIdAndDelete(id)

            if (!bookDeleted) return res.status(401).json({
                message: "Erro ao deletar livro"
            })

            return res.status(200).json({
                message: "Livro deletado com sucesso"
            })
        } catch (error) {
            console.error(`Erro ao deletar um livro: ${error.message}`)
            return res.status(500).json({
                message: "Erro interno no servidor"
            })
        }
    }
}

export default BookController
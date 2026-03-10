import ErrorNotFound from "../errors/ErrorNotFound.js"
import { authors } from "../models/index.js"

class authorController {
    static getAllAuthors = async (req, res, next) => {
        try {
            const listAuthors = authors.find({})

            req.result = listAuthors

            next()
        } catch (error) {
            console.error(`Erro ao buscar autores: ${error.message}`)
            
            next(error)
        }
    }

    static registerAuthor = async (req, res, next) => {
        try {
            const body = req.body

            const authorRegistered = await authors.create(body)

            return res.status(201).json({
                message: "Autor cadastrado com sucesso",
                autor: authorRegistered
            })
        } catch (error) {
            console.error(`Erro ao cadastrar autor: ${error.message}`)
            
            next(error)
        }
    }

    static getAuthorById = async (req, res, next) => {
        try {
            const { id } = req.params

            const authorFound = await authors.findById(id)

            if (!authorFound) return next(new ErrorNotFound("ID do autor não foi encontrado"))

            return res.status(200).json(authorFound)
        } catch (error) {
            console.error(`Erro ao buscar um autor: ${error.message}`)

            next(error)
        }
    }

    static updateAuthor = async (req, res, next) => {
        try {
            const { id } = req.params
            const body = req.body

            const authorUpdated = await authors.findByIdAndUpdate(id, body)

            
            if(!authorUpdated) return next(new ErrorNotFound("ID do autor não foi encontrado"))

            return res.status(200).json({
                message: "Autor atualizado com sucesso"
            })
        } catch (error) {
            console.error(`Erro ao atualizar um autor: ${error.message}`)
            
            next(error)
        }
    }

    static deleteAuthor = async (req, res, next) => {
        try {
            const { id } = req.params

            const authorDeleted = await authors.findByIdAndDelete(id)

            if(!authorDeleted) return next(new ErrorNotFound("ID do autor não foi encontrado"))

            return res.status(200).json({
                message: "Autor deletado com sucesso"
            })
        } catch (error) {
            console.error(`Erro ao deletar um autor: ${error.message}`)

            next(error)
        }
    }
}

export default authorController
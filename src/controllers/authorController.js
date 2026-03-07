import { author } from "../models/Author.js"

class authorController {
    static getAllAuthors = async (req, res, next) => {
        try {
            const listAuthors = await author.find({})

            return res.status(200).json(listAuthors)
        } catch (error) {
            console.error(`Erro ao buscar autores: ${error.message}`)
            
            next(error)
        }
    }

    static registerAuthor = async (req, res, next) => {
        try {
            const body = req.body

            const authorRegistered = await author.create(body)

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

            const authorFound = await author.findById(id)

            if (!authorFound) return res.status(404).json({
                message: "ID do autor não foi encontrado"
            })

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

            const authorUpdated = await author.findByIdAndUpdate(id, body)

            if (!authorUpdated) return res.status(404).json({
                message: "Erro ao atualizar o autor"
            })

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

            await author.findByIdAndDelete(id)

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
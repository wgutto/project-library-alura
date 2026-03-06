import { author } from "../models/Author.js"

class authorController {
    static async getAllAuthors(req, res) {
        try {
            const listAuthors = await author.find({})

            return res.status(200).json(listAuthors)
        } catch (error) {
            console.error(`Erro ao buscar autores: ${error.message}`)
            return res.status(500).json({
                message: "Erro interno no servidor"
            })
        }
    }

    static async registerAuthor(req, res) {
        try {
            const body = req.body

            const authorRegistered = await author.create(body)

            return res.status(201).json({
                message: "Autor cadastrado com sucesso",
                autor: authorRegistered
            })
        } catch (error) {
            console.error(`Erro ao cadastrar autor: ${error.message}`)
            return res.status(500).json({
                message: "Erro interno no servidor"
            })
        }
    }

    static async getAuthorById(req, res) {
        try {
            const { id } = req.params

            const authorFound = await author.findById(id)

            if (!authorFound) return res.status(400).json({
                message: "Autor nao foi encontrado"
            })

            return res.status(200).json(authorFound)
        } catch (error) {
            console.error(`Erro ao buscar um autor: ${error.message}`)
            return res.status(500).json({
                message: "Erro interno no servidor"
            })
        }
    }

    static async updateAuthor(req, res) {
        try {
            const { id } = req.params
            const body = req.body

            const authorUpdated = await author.findByIdAndUpdate(id, body)

            if (!authorUpdated) return res.status(400).json({
                message: "Erro ao atualizar o autor"
            })

            return res.status(200).json({
                message: "Autor atualizado com sucesso"
            })
        } catch (error) {
            console.error(`Erro ao atualizar um autor: ${error.message}`)
            return res.status(500).json({
                message: "Erro interno no servidor"
            })
        }
    }

    static async deleteAuthor(req, res) {
        try {
            const { id } = req.params

            const authorDeleted = await author.findByIdAndDelete(id)

            if (!authorDeleted) return res.status(401).json({
                message: "Erro ao deletar autor"
            })

            return res.status(200).json({
                message: "Autor deletado com sucesso"
            })
        } catch (error) {
            console.error(`Erro ao deletar um autor: ${error.message}`)
            return res.status(500).json({
                message: "Erro interno no servidor"
            })
        }
    }
}

export default authorController
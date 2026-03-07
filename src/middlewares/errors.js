import mongoose from "mongoose"

// eslint-disable-next-line no-unused-vars
const errors = (error, req, res, next) => {
    if (error instanceof mongoose.Error.CastError) {
        return res.status(400).json({
            message: "Um ou mais dados fornecidos estão incorretos"
        })
    } else if (error instanceof mongoose.Error.ValidationError) {
        const messagesError = Object.values(error.errors).map(error => error.message).join("; ")

        return res.status(400).json({
            message: `Os seguintes erros foram encontrados: ${messagesError}`
        })
    } else {
        return res.status(500).json({
            message: "Erro interno no servidor"
        })
    }
}

export default errors
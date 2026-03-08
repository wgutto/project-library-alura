import ErrorNotFound from "../errors/ErrorNotFound.js"

const error404 = (req, res, next) => {
    const error404 = new ErrorNotFound()

    next(error404)
}

export default error404
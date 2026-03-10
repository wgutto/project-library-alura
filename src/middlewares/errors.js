import mongoose from "mongoose"
import ErrorBase from "../errors/ErrorBase.js"
import RequestIncorrect from "../errors/RequestIncorrect.js"
import ErrorValidation from "../errors/ErrorValidation.js"

// eslint-disable-next-line no-unused-vars
const errors = (error, req, res, next) => {
    if (error instanceof mongoose.Error.CastError) {
        return new RequestIncorrect().sendResponse(res)
    } else if (error instanceof ErrorBase) {
        error.sendResponse(res)
    } else if (error instanceof mongoose.Error.ValidationError) {
        return new ErrorValidation(error).sendResponse(res)
    } else {
        return new ErrorBase().sendResponse(res)
    }
}

export default errors
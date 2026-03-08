import RequestIncorrect from "./RequestIncorrect.js";

class ErrorValidation extends RequestIncorrect {
    constructor(error) {
        const messagesError = Object.values(error.errors).map(error => error.message).join("; ")

        super(`Um ou mais dados fornecidos estão incorretos: ${messagesError}`)
    }
}

export default ErrorValidation
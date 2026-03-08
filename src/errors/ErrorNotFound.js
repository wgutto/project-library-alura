import ErrorBase from "./ErrorBase.js";

class ErrorNotFound extends ErrorBase {
    constructor(message = "Página não encontrada") {
        super(message, 404)
    }
}

export default ErrorNotFound
import RequestIncorrect from "../errors/RequestIncorrect.js"

export const paginate = async (req, res, next) => {
    try {
        let { limit = 3, page = 1, ordering = "_id:-1" } = req.query

        let [fieldOrdering, order] = ordering.split(":")

        limit = parseInt(limit)
        page = parseInt(page)
        order = parseFloat(order)

        if (limit <= 0 || page <= 0) return next(new RequestIncorrect())

        const result = req.result

        const pagedSearch = await result.find({})
            .sort({ [fieldOrdering]: order })
            .skip((page - 1) * limit)
            .limit(limit)

        return res.status(200).json(pagedSearch)
    } catch (error) {
        console.log(error)
        next(error)
    }
}
class APIFeatures {
    constructor(query, queryStr) {
        this.query = query
        this.queryStr = queryStr
    }

    search() {
        const q = this.queryStr.q ? {
            name: {
                $regex: this.queryStr.q,
                $options: 'i'
            }
        } : {}
        this.query = this.query.find({ ...q })
        return this
    }

    filter() {
        const queryCopy = { ...this.queryStr }
        ['q', 'limit', 'page'].forEach(e => delete queryCopy[e])

        //filter cost of product
        let queryStr = JSON.stringify(queryCopy)
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`)

        this.query = this.query.find(JSON.parse(queryStr))
        return this
    }

    pagination(resPerPage) {
        const currentPage = Number(this.queryStr.page) || 1
        const skip = resPerPage * (currentPage - 1)
        this.query = this.query.limit(resPerPage).skip(skip)
        return this
    }
}

export default APIFeatures
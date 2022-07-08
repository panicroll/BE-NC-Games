const fetchReviews = require("../models/fetchReviews")

const getReviews = (req, res) => {
    fetchReviews().then((reviews) => {
        res.status(200).send({reviews})
    })
}

module.exports = getReviews
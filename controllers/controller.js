const {fetchCategories, fetchReview} = require("../models/model")

const getCategories = (req, res) => {
    fetchCategories().then((categories) => {
        res.status(200).send({categories})
    })
}

const getReview = (req, res, next) => {
    const {review_id} = req.params;
    fetchReview(review_id).then((review) => {
        res.status(200).send({review})
    }).catch((err) => {
        next(err);
    })
}

module.exports = {getCategories, getReview}
const db = require("../db/connection");

const fetchCategories = () => {
    return db.query(
        `SELECT * FROM categories;`
    ).then(({rows}) => {
        return rows;
    })
}

const fetchReview = (review_id) => {
    return db.query(
        `SELECT * FROM reviews WHERE review_id = $1;`, [review_id]
    ).then(({rows}) => {
        const review = rows[0];
        if(!review) {
            return Promise.reject({status: 404, message: "Review not found"})
        }
        return review;
    })
}

module.exports = {fetchCategories, fetchReview}
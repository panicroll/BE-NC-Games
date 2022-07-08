const db = require("../db/connection");

const fetchCommentsByReviewId = (review_id) => {
  return db
    .query(`SELECT * FROM comments WHERE review_id = $1;`, [review_id])
    .then(({ rows }) => {
      const comments = rows;
      if (!comments) {
        return Promise.reject({ status: 404, message: "Review not found" });
      }
      return comments;
    });
};

module.exports = fetchCommentsByReviewId;

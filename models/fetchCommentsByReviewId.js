const db = require("../db/connection");

const fetchCommentsByReviewId = (review_id) => {
  return db
    .query(`SELECT * FROM reviews WHERE review_id = $1;`, [review_id])
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({ status: 404, message: "Review not found" });
      }
      return db
        .query(`SELECT * FROM comments WHERE review_id = $1;`, [review_id])
        .then(({ rows }) => {
          const comments = rows;
          console.log(comments);
          if (comments.length === 0) {
            return Promise.reject({ status: 404, message: "No comments found" });
          }
          return comments;
        });
    });
};

module.exports = fetchCommentsByReviewId;

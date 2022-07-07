const db = require("../db/connection");

const updateReview = (inc_votes, review_id) => {
  return db
    .query(
      `UPDATE reviews SET votes = votes + $1 WHERE review_id = $2 RETURNING *;`,
      [inc_votes, review_id]
    )
    .then(({ rows }) => {
      const review = rows[0];
      if (!review) {
        return Promise.reject({ status: 404, message: "Review not found" });
      }
      return review;
    });
};

module.exports = updateReview;

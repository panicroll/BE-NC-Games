const db = require("../db/connection");

const fetchReviews = () => {
  return db
    .query(
      `SELECT reviews.*, COUNT(comments.comment_id)::INT AS comment_count 
    FROM reviews LEFT JOIN comments ON comments.review_id = reviews.review_id 
    GROUP BY reviews.review_id ORDER BY created_at desc;`
    )
    .then(({ rows }) => {
        console.log(rows)
      return rows;
    });
};

module.exports = fetchReviews;

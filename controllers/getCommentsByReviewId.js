const fetchCommentsByReviewId = require("../models/fetchCommentsByReviewId")

const getCommentsByReviewId = (req, res, next) => {
    const { review_id } = req.params;
    fetchCommentsByReviewId(review_id).then((comments) => {
        res.status(200).send({comments});
    }).catch((err) => {
        next(err);
      });
}

module.exports = getCommentsByReviewId;
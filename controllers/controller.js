const fetchCategories = require("../models/model")

const getCategories = (req, res) => {
    fetchCategories().then((categories) => {
        res.status(200).send({categories})
    })
}

module.exports = getCategories
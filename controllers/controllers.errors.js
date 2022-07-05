const handleNotFound = (req, res) => {
    res.status(404).send({message: "Not found"})
}

module.exports = handleNotFound
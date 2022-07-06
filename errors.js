const handleNotFound = (req, res) => {
  res.status(404).send({ message: "Not found" });
};

const handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.message) {
    const { status, message } = err;
    res.status(status).send({ message });
  } else {
    next(err);
  }
};

const handlePSQLErrors = (err, req, res, next) => {
  if (err.code === "22P02") {
    res.status(400).send({ message: "Bad request" });
  } else {
    next(err);
  }
};

const handleServerErrors = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal server error" });
};

module.exports = {
  handleNotFound,
  handleCustomErrors,
  handlePSQLErrors,
  handleServerErrors,
};

const handleError = (error, res ) => {
  const ERROR_CODE = 400;
  if (error.name === "NOT_FOUND") {
    return res.status(error.statusCode).send({
      status: false,
      message: "NOT FOUND",
      error
    });

  }else {
    return res.status(ERROR_CODE).send({
      status: false,
      message:" REQUEST ERROR",
      error
    });
  }
};

module.exports = handleError;
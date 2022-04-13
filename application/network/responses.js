const success = (req, res, message, status) => {
  res.status(status || 200).send({
    error: "",
    data: message,
  });
};

const error = (req, res, message, status) => {
  res.status(status || 500).send({
    error: message,
  });
};


module.exports = {
  success, 
    error
}
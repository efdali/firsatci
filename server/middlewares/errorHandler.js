const errorHandler = (err, req, res, next) => {
  if (err.code === 11000) {
    return res.status(400).json({
      success: false,
      message: 'This product is already exist.',
    });
  }

  if (err.name === 'SyntaxError') {
    return res.status(400).json({
      success: false,
      message: 'Unexpected syntax error.',
    });
  }

  if (err.name === 'TypeError') {
    return res.status(401).json({
      success: false,
      message: 'Type error has occured.',
    });
  }

  if (err.status === 404) {
    return res.status(404).json({
      success: false,
      message: err.message,
    });
  }

  if (err.status === 400) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }

  res.status(500).json({
    success: false,
    message: 'Unexpected error',
  });
};

module.exports = errorHandler;

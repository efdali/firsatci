const validateInputs = (req) => {
  const { name, url, selector } = req.body;
  return name && url && selector;
};

module.exports = { validateInputs };

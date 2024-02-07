const notAllowedFieldsToUpdateError = (res) => {
  return res.status(500).send("One or more fields are not editable");
};

module.exports = {
  notAllowedFieldsToUpdateError,
};

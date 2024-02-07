const nofFoundError = (res) => {
  return res.status(404).send("This data is not found in DataBase!");
};

const objectIdCastError = (res) => {
  return res
    .status(500)
    .send("An error ocurried on try to retrieve this data on DataBase!");
};

module.exports = {
  nofFoundError,
  objectIdCastError,
};

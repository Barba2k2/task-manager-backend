const nofFoundError = (res) => {
  return res.status(404).send("This data is not found in DataBase!");
};

module.exports = {
  nofFoundError
}

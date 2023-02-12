const person = require("../../models/dmin");

const address = async (req, res) => {
  try {
    admin = await person.findOne({});
  } catch (err) {
    console.log(err.message);
  }
  if (admin) return res.json({ address: admin.Address });
};
module.exports = address;

import person from "../../models/dmin.js";

const address = async (req, res) => {
  try {
    admin = await person.findOne({});
  } catch (err) {
    console.log(err.message);
  }
  if (admin) return res.json({ address: admin.Address });
};
export default address;

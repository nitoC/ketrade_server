const person = require("../../models/models");

const withdraw = async (req, res) => {
  const { address, amount, email } = req.body;
  let user;
  try {
    user = await person.updateOne(
      { email },
      {
        "withdrawal.address": address,
        "withdrawal.amount": amount,
        $push: {
          transactions: {
            value: amount,
            text: "pending",
            typeO: "withdrawal",
            time:
              new Date().getFullYear() +
              "/" +
              (new Date().getMonth() + 1) +
              "/" +
              new Date().getDay() +
              1,
          },
        },
      }
    );
  } catch (err) {
    console.log(err.message);
  }
  if (user) return res.json("withdrawal request submitted");
};
module.exports = withdraw;

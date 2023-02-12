const person = require("../../models/models");

const deposit = async (req, res) => {
  let user;
  let tst;
  const { email, capital, plan } = req.body;
  try {
    user = await person.updateOne(
      { email },
      {
        pending: { plan, deposit: capital },
        $push: {
          transactions: {
            value: capital,
            text: "pending",
            typeO: "deposit",
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
    tst = await person.findOne({ email });
  } catch (err) {
    console.log(err.message);
  }
  if (user) {
    return res.json("deposit request made");
  } else {
    res.json("error try again");
  }
};
module.exports = deposit;

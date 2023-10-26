const Payment = require("../../models/payment");

const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(201).send(payments);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  getAllPayments,
};

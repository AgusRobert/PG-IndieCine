const { ACCESS_TOKEN } = process.env;
const axios = require("axios");

exports.toPay = async (props) => {
  const {name, price, description, picture_url, id, email} = props
  const url = "https://api.mercadopago.com/checkout/preferences";
  const body = {
    payer_email: email,
    items: [
      {
        title: name,
        description: description,
        picture_url: picture_url,
        category_id: id,
        quantity: 1,
        unit_price: price,
      },
    ],
    back_urls: {
      failure: "/failure",
      pending: "/pending",
      success: "/success",
    },
  };
  return (
    await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
  )?.data;
};

exports.subscribe = async (props) => {
  const {reason, transaction_amount, currency_id, payer_email} = props
  const url = "https://api.mercadopago.com/preapproval";
  const body = {
    reason: reason ,
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: transaction_amount,
      currency_id: currency_id,
    },
    back_url: "https://google.com.ar",
    payer_email: payer_email,
  };
  return (
    await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
  )?.data;
};

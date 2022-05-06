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

exports.subscribe = async () => {
  const url = "https://api.mercadopago.com/preapproval";
  const body = {
    reason: "Suscripción de ejemplo",
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: 10,
      currency_id: "CLP",
    },
    back_url: "https://google.com.ar",
    payer_email: "test_user_54987522@testuser.com",
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

const { ACCESS_TOKEN } = process.env;
const axios = require("axios");

exports.toPay = async () => {
  const url = "https://api.mercadopago.com/checkout/preferences";
  const body = {
    payer_email: "test_user_46945293@testuser.com",
    items: [
      {
        title: "Dummy Title",
        description: "Dummy description",
        picture_url: "http://www.myapp.com/myimage.jpg",
        category_id: "category123",
        quantity: 1,
        unit_price: 10,
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

const { ACCESS_TOKEN } = process.env;
const axios = require("axios");
const header = {
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${ACCESS_TOKEN}`,
  },
};

exports.toPay = async (props) => {
  const { name, price, description, picture_url, id, email } = props;
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
  return (await axios.post(url, body, header))?.data;
};

exports.subscribe = async (props) => {
  const { reason, transaction_amount, currency_id, payer_email } = props;
  const url = "https://api.mercadopago.com/preapproval";
  const body = {
    reason: reason,
    auto_recurring: {
      frequency: 1,
      frequency_type: "months",
      transaction_amount: transaction_amount,
      currency_id: currency_id,
    },
    back_url: "https://8d19-179-6-206-23.ngrok.io/profile",
    payer_email: payer_email,
    notification_url: "https://8d19-179-6-206-23.ngrok.io/payment/notification",
  };
  return (await axios.post(url, body, header))?.data;
};

exports.validation = async (email) => {
  // console.log("EMAIL DE VALIDATE", email);
  // try {
  const url = `https://api.mercadopago.com/preapproval/search?payer_email=${email}&sort=last_modified:desc&status=authorized&status=pending&limit=1`;
  const response = await axios.get(url, header);
  return response.data;
  // return [];
  // } catch (error) {
  //   console.log("validation service catch", error);
  // }
};

exports.cancelSuscribe = async (id) => {
  try {
    const url = `https://api.mercadopago.com/preapproval/${id}`;
    const body = {
      status: "cancelled",
    };
    return (await axios.put(url, body, header))?.data;
  } catch (error) {
    console.log("cancelSuscribe service catch", error);
  }
};

exports.getIdSubscribe = async (email, offset = 0) => {
  // try {
  const url = `https://api.mercadopago.com/preapproval/search?payer_email=${email}&sort=last_modified:desc&status=authorized&limit=2&offset=${offset}`;
  return (await axios.get(url, header))?.data?.results[0]?.id;
  // } catch {
  //   console.log("Service getIdSubscribe", error);
  // }
};

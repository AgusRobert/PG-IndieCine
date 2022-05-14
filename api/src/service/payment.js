const { ACCESS_TOKEN } = process.env;
const axios = require("axios");

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
  return (
    await axios.post(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    })
  )?.data;
};

exports.validation = async (props) => {
  // console.log("EMAIL DE VALIDATE", props)
  try {
    const url = `https://api.mercadopago.com/preapproval/search?payer_email=${props}`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("validation service catch", error);
  }
};

exports.cancelSuscribe = async (id) => {
  try {
    const url = `https://api.mercadopago.com/preapproval/${id}`;
    const body = {
      status: "cancelled",
    };
    const response = await axios.put(url, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    return response.data;
  } catch (error) {
    console.log("cancelSuscribe service catch", error);
  }
};

exports.getIdSubscribe = async (email) => {
  try {
    const url = `https://api.mercadopago.com/preapproval/search?payer_email=${email}`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    });
    const subscriptions =  response.data.results;
    let aux = -1;
    subscriptions?.forEach((subscription) => {
      if (subscription.status === "authorized") {
        //quedaria guardado en aux, la ultima subscripcion que esta autorizada
        //porque primero tenemos que pagar las dos y luego cancelar la primera.
        //y acá queda la segunda.
        aux = subscription.id;
      }
    })
    return aux;
  
  } catch (error) {
    console.log("getIdSubscription service catch", error);
  }
};

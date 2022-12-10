import { Button } from "@chakra-ui/react";
import React, { useState } from "react";
// import logo from "./logo.svg";
import styles from "./Payment.module.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

const __DEV__ = document.domain === "onrender.com";

export const Payment = ({ price }) => {
  
  const [name, setName] = useState("Mehul");

  async function displayRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("https://vikash-land-app.onrender.com/razorpay", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ price }),
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: __DEV__ ? "rzp_test_X1AazF5paSfEvw" : "PRODUCTION_KEY",
      currency: data.currency,
      amount: price.toString() || data.amount.toString(),
      order_id: data.id,
      name: "Payment to Vikash Land App",
      description: "Thank you for nothing. Please give us some money",
      image: "https://vikash-land-app.onrender.com/logo.png",
      handler: function (response) {
        alert(response.razorpay_payment_id);
        alert(response.razorpay_order_id);
        alert(response.razorpay_signature);
      },
      prefill: {
        name,
        email: "vikashvashistha278@gmail.com",
        phone_number: "6367785627",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div >
      <header>
        
        <Button
          className={styles.App_link}
          onClick={displayRazorpay}
          target="_blank"
          rel="noopener noreferrer"
        >
          Place Order
        </Button>
      </header>
    </div>
  );
}

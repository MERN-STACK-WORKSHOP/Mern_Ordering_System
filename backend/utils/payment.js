const fetch = require("node-fetch");
const {
  merchantUid,
  merchantApiUserId,
  merchantApiKey,
} = require("../config/env");

/**
 * @description create a payment using waafi payment gateway
 * @param {number} phone
 * @param {number} amount
 * @param {string} transactionId
 * @param {string} description
 * @returns {Promise}
 */
const payment = async ({ phone, amount, transactionId, description }) => {
  try {
    const paymentBody = {
      schemaVersion: "1.0",
      requestId: "10111331033",
      timestamp: Date.now(),
      channelName: "WEB",
      serviceName: "API_PURCHASE",
      serviceParams: {
        merchantUid: merchantUid,
        apiUserId: merchantApiUserId,
        apiKey: merchantApiKey,
        paymentMethod: "mwallet_account",
        payerInfo: {
          accountNo: phone,
        },
        transactionInfo: {
          referenceId: transactionId,
          invoiceId: `${Date.now() + Math.floor(Math.random() * 10000)}`,
          amount,
          currency: "USD",
          description,
        },
      },
    };
    const response = await fetch("https://api.waafipay.net/asm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(paymentBody),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

module.exports = payment;

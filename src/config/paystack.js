// import axios from "axios";
// import ApiError from "../utils/apiError.js";

// const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
// const PAYSTACK_BASE_URL = "https://api.paystack.co";

// // 🔹 Generic Paystack API request function
// const paystackRequest = async (method, endpoint, data = {}) => {
//   try {
//     const response = await axios({
//       method,
//       url: `${PAYSTACK_BASE_URL}${endpoint}`,
//       headers: {
//         Authorization: `Bearer ${PAYSTACK_SECRET}`,
//       },
//       data,
//     });
//     return response.data.data;
//   } catch (error) {
//     throw ApiError.internalServerError(
//       `Paystack API Error: ${error.response?.data?.message || error.message}`
//     );
//   }
// };

// // 🔹 Initialize Payment
// export const initializePayment = async (email, amount, userId) => {
//   return await paystackRequest("post", "/transaction/initialize", {
//     email,
//     amount: amount * 100,
//     reference: `TKT-${Date.now()}-${userId}`,
//   });
// };

// // 🔹 Verify Payment
// export const verifyPayment = async (reference) => {
//   return await paystackRequest("get", `/transaction/verify/${reference}`);
// };

// export default { initializePayment, verifyPayment };



// src/config/paystack.js

import axios from "axios";
import ApiError from "../utils/apiError.js";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = "https://api.paystack.co";

// 🔹 Generic Paystack API request
const paystackRequest = async (method, endpoint, data = {}) => {
  try {
    const response = await axios({
      method,
      url: `${PAYSTACK_BASE_URL}${endpoint}`,
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`,
      },
      data,
    });
    return response.data.data;
  } catch (error) {
    throw ApiError.internalServerError(
      `Paystack API Error: ${error.response?.data?.message || error.message}`
    );
  }
};

// 🔹 Initialize Payment
const initializePayment = (email, amount, reference) => {
  return paystackRequest("post", "/transaction/initialize", {
    email,
    amount: amount * 100,
    reference,
    
  });
};

// 🔹 Verify Payment
const verifyPayment = (reference) => {
  return paystackRequest("get", `/transaction/verify/${reference}`);
};

export default {
  initializePayment,
  verifyPayment,
};

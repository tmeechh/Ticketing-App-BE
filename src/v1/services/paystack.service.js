// import User from "../models/user.model.js";
// import ApiError from "../../utils/apiError.js";
// import Paystack from "../../config/paystack.js";

// export const initializePayment = async (userId, amount) => {
//   // Fetch user email from DB
//   const user = await User.findById(userId);
//   if (!user) throw ApiError.notFound("User not found");

//   // Call Paystack function
//   return await Paystack.initializePayment(user.email, amount, userId);
// };

// export const verifyPayment = async (reference) => {
//   return await Paystack.verifyPayment(reference);
// };

// export default { initializePayment, verifyPayment };

// src/v1/services/paystack.service.js

import User from "../models/user.model.js";
import ApiError from "../../utils/apiError.js";
import Paystack from "../../config/paystack.js";

// 🔹 Initialize Payment (with checking user)
export const initializePayment = async (userId, amount) => {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound("User not found");

  const reference = `TKT-${Date.now()}-${userId}`; // Unique reference
  return await Paystack.initializePayment(user.email, amount, reference);
};

// 🔹 Verify Payment (simple)
export const verifyPayment = async (reference) => {
  return await Paystack.verifyPayment(reference);
};

export default { initializePayment, verifyPayment };


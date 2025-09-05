// import asyncWrapper from "../../middlewares/asyncWrapper.js";
// import authService from "../../v1/services/auth.service.js";

// export const register = asyncWrapper(async (req, res, next) => {
//   const userData = req.body;
//   const result = await authService.register(userData);
//   res.status(201).json(result);
// });

// export const login = asyncWrapper(async (req, res, next) => {
//   const userData = req.body;
//   const result = await authService.login(userData);
//   res.status(200).json(result);
// });

// export const getUser = asyncWrapper(async (req, res, next) => {
//   const { userId } = req.user;
//   const result = await authService.getUser(userId);
//   res.status(200).json(result);
// });

// export const sendOTP = asyncWrapper(async (req, res, next) => {
//   const { email } = req.body;
//   const result = await authService.sendOTP({ email });
//   res.status(200).json(result);
// });

// export const verifyOTP = asyncWrapper(async (req, res, next) => {
//   const { email, otp } = req.body;
//   const result = await authService.verifyOTP({ email, otp });
//   res.status(200).json(result);
// });

// export const forgotPassword = asyncWrapper(async (req, res, next) => {
//   const { email } = req.body;
//   const result = await authService.forgotPassword({ email });
//   res.status(200).json(result);
// });

// export const resetPassword = asyncWrapper(async (req, res, next) => {
//   const { email, otp, password } = req.body;
//   const result = await authService.resetPassword({ email, otp, password });
//   res.status(200).json(result);
// });

// export const updateProfile = asyncWrapper(async (req, res) => {
//   const userId = req.user._id;
//   const result = await authService.updateProfile(userId, req);
//   res.status(200).json(result);
// });


import asyncWrapper from "../../middlewares/asyncWrapper.js";
import authService from "../../v1/services/auth.service.js";

export const register = asyncWrapper(async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await authService.register(userData);
    res.status(201).json(result);
  } catch (err) {
    console.error("❌ [REGISTER ERROR]", err.message, err.stack);
    next(err);
  }
});

export const login = asyncWrapper(async (req, res, next) => {
  try {
    const userData = req.body;
    const result = await authService.login(userData);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ [LOGIN ERROR]", err.message, err.stack);
    next(err);
  }
});

export const getUser = asyncWrapper(async (req, res, next) => {
  try {
    const { userId } = req.user;
    const result = await authService.getUser(userId);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ [GET USER ERROR]", err.message, err.stack);
    next(err);
  }
});

export const sendOTP = asyncWrapper(async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.sendOTP({ email });
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ [SEND OTP ERROR]", err.message, err.stack);
    next(err);
  }
});

export const verifyOTP = asyncWrapper(async (req, res, next) => {
  try {
    const { email, otp } = req.body;
    const result = await authService.verifyOTP({ email, otp });
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ [VERIFY OTP ERROR]", err.message, err.stack);
    next(err);
  }
});

export const forgotPassword = asyncWrapper(async (req, res, next) => {
  try {
    const { email } = req.body;
    const result = await authService.forgotPassword({ email });
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ [FORGOT PASSWORD ERROR]", err.message, err.stack);
    next(err);
  }
});

export const resetPassword = asyncWrapper(async (req, res, next) => {
  try {
    const { email, otp, password } = req.body;
    const result = await authService.resetPassword({ email, otp, password });
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ [RESET PASSWORD ERROR]", err.message, err.stack);
    next(err);
  }
});

export const updateProfile = asyncWrapper(async (req, res, next) => {
  try {
    const userId = req.user._id;
    console.log("📝 Updating profile for:", userId);
    if (req.file) console.log("📷 Uploaded file:", req.file);
    const result = await authService.updateProfile(userId, req);
    res.status(200).json(result);
  } catch (err) {
    console.error("❌ [UPDATE PROFILE ERROR]", err.message, err.stack);
    next(err);
  }
});



// // export default { register, login, getUser };

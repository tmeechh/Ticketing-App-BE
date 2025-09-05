import mongoose from 'mongoose';
import { generateToken } from '../../config/token.js';
import User from '../models/user.model.js';
import OTP from '../models/otp.model.js';
import ApiError from '../../utils/apiError.js';
import { hashPassword, validatePassword } from '../../utils/validationUtils.js';
import ApiSuccess from '../../utils/apiSuccess.js';
import emailService from './email.service.js';
import cloudinary from '../../config/cloudinary.js';
import fs from 'fs';
import { uploadBufferToCloudinary } from "./upload.service.js";

export async function findUserByEmail(email) {
  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    throw ApiError.notFound('No user with this email');
  }
  return user;
}

export async function findUserByIdOrEmail(identifier) {
  const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
  const user = await User.findOne(
    isObjectId ? { _id: identifier } : { email: identifier }
  ).select('+password');

  if (!user) {
    throw ApiError.notFound('User Not Found');
  }

  return user;
}

export async function register(userData = {}) {
  const { password } = userData;
  const hashedPassword = await hashPassword(password);

  const roles = userData.roles ?? ['user'];
  const user = await User.create({
    ...userData,
    roles,
    password: hashedPassword,
  });

  const token = generateToken(
    {
      email: user.email,
      userId: user._id,
      roles: user.roles,
    },
    '7d'
  );

  // const token = generateToken(user._id.toString());

  try {
    const emailInfo = await emailService.sendOTPEmail(
      user.email,
      user.firstName
    );

    return ApiSuccess.created(
      `Registration Successful, Email has been sent to ${emailInfo.envelope.to}`,
      { user }
    );
  } catch (error) {
    console.log('Error sending email', error);
    return ApiSuccess.created(`Registration Successful`, {
      user,
    });
  }
}

export async function login(userData = {}) {
  const { email, password } = userData;
  const user = await findUserByEmail(email);
  await validatePassword(password, user.password);

  if (!user.isEmailVerified) {
    throw ApiError.forbidden('Email Not Verified');
  }

  const token = generateToken({
    userId: user._id,
    user: user._id,
    roles: user.roles,
  });

  // const token = generateToken(user._id.toString());

  user.password = undefined;

  return ApiSuccess.ok('Login Successful', {
    user,
    token,
  });
}

export async function getUser(userId) {
  const user = await findUserByIdOrEmail(userId);
  user.password = undefined;
  return ApiSuccess.ok('User Retrieved Successfully', {
    user,
  });
}

export async function sendOTP({ email }) {
  const user = await findUserByIdOrEmail(email);
  if (user.isVerified) {
    return ApiSuccess.ok('User Already Verified');
  }

  const emailInfo = await emailService.sendOTPEmail(user.email, user.firstName);
  return ApiSuccess.ok(`OTP has been sent to ${emailInfo.envelope.to}`);
}

export async function verifyOTP({ email, otp }) {
  const user = await findUserByEmail(email);
  if (user.isEmailVerified) {
    return ApiSuccess.ok('User Already Verified');
  }

  const otpExists = await OTP.findOne({ email, otp });
  if (!otpExists || otpExists.expiresAt < Date.now()) {
    throw ApiError.badRequest('Invalid or Expired OTP');
  }

  user.isEmailVerified = true;
  await user.save();
  return ApiSuccess.ok('Email Verified');
}

export async function forgotPassword({ email }) {
  const user = await findUserByIdOrEmail(email);
  const emailInfo = await emailService.sendOTPEmail(
    user.email,
    user.firstName,
    'forgotPassword'
  );
  return ApiSuccess.ok(`OTP has been sent to ${emailInfo.envelope.to}`);
}

export async function resetPassword({ email, otp, password }) {
  const user = await findUserByEmail(email);
  const otpExists = await OTP.findOne({ email, otp });
  if (!otpExists) {
    throw ApiError.badRequest('Invalid or Expired OTP');
  }

  user.password = await hashPassword(password);
  await user.save();
  return ApiSuccess.ok('Password Updated');
}

export async function updateProfile({ userId, req }) {
  const user = await User.findById(userId);
  if (!user) throw ApiError.notFound('User not found');

  // Handle full name update
  if (req.body.fullName) {
    user.fullName = req.body.fullName.trim();
  }

  if (req.file) {
    try {
      const imageUrl = await uploadBufferToCloudinary(
        req.file.buffer,
        "EventHorizon/users"
      );
      user.image = imageUrl;
    } catch (err) {
      throw ApiError.badRequest("Image upload failed");
    }
  }
 
//  if (req.file) {
//     try {
//       const uploadResult = await cloudinary.uploader.upload(req.file.path, {
//         folder: "EventHorizon/users",
//         public_id: `${userId}_profile_${Date.now()}`,
//         overwrite: true,
//         resource_type: "image",
//       });

//       user.image = uploadResult.secure_url;

//       // Clean up temp file
//       fs.unlinkSync(req.file.path);
//     } catch (err) {
//       throw ApiError.badRequest('Image upload failed');
//     }
//   }

  await user.save();
  user.password = undefined; // never return password

  return ApiSuccess.ok('Profile updated successfully', { user });
}

const authService = {
  findUserByEmail,
  findUserByIdOrEmail,
  register,
  login,
  sendOTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
  updateProfile,
};

export default authService;

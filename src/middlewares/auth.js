import { verifyToken } from "../config/token.js";
import ApiError from "../utils/apiError.js";
import asyncWrapper from "./asyncWrapper.js";
import User from "../v1/models/user.model.js";

const isAuth = asyncWrapper(async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw ApiError.unauthorized("No Token Provided");
  }
  const token = authHeader.split(" ")[1];
  const payload = verifyToken(token);

   const id = typeof payload.userId === 'object' ? payload.userId.userId : payload.userId;
   const user = await User.findById(id);
   if (!user) {
     throw ApiError.unauthorized("User no longer exists");
   }


  req.user = user;
  next();
});

export { isAuth };

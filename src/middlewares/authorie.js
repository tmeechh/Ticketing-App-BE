import ApiError from "../utils/apiError.js";

export const onlyOrganizers = (req, res, next) => {
  const userRoles = req.user.roles;

  if (!userRoles || !userRoles.includes("organizer")) {
    throw ApiError.forbidden("Only organizers can perform this action");
  }

  next();
};

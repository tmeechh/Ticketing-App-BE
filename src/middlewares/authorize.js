// middlewares/authorize.js
import ApiError from '../utils/apiError.js';

export const onlyOrganizers = (req, res, next) => {
  const userRoles = req.user.roles;
  if (!userRoles || !userRoles.includes('organizer')) {
    throw ApiError.forbidden('Only organizers can perform this action');
  }
  next();
};

export const onlyAdmins = (req, res, next) => {
  const userRoles = req.user.roles;
  if (!userRoles || !userRoles.includes('admin')) {
    throw ApiError.forbidden('Only admins can perform this action');
  }
  next();
};

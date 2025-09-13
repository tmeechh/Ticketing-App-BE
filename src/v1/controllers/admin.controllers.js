import asyncWrapper from "../../middlewares/asyncWrapper.js";
import adminService from "../services/admin.service.js";

// USERS
export const getAllUsers = asyncWrapper(async (req, res) => {
  const result = await adminService.getAllUsersService();
  res.status(200).json(result);
});

export const deleteUser = asyncWrapper(async (req, res) => {
  const result = await adminService.deleteUserService(req.params.id);
  res.status(200).json(result);
});

// EVENTS
export const getAllEvents = asyncWrapper(async (req, res) => {
  const result = await adminService.getAllEventsService();
  res.status(200).json(result);
});

export const deleteEvent = asyncWrapper(async (req, res) => {
  const result = await adminService.deleteEventService(req.params.id);
  res.status(200).json(result);
});

// TICKETS
export const getAllTickets = asyncWrapper(async (req, res) => {
  const result = await adminService.getAllTicketsService();
  res.status(200).json(result);
});

export const deleteTicket = asyncWrapper(async (req, res) => {
  const result = await adminService.deleteTicketService(req.params.id);
  res.status(200).json(result);
});

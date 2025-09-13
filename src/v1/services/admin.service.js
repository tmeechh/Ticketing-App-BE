import User from "../models/user.model.js";
import Event from "../models/event.model.js";
import Ticket from "../models/ticket.model.js";
import ApiError from "../../utils/apiError.js";
import ApiSuccess from "../../utils/apiSuccess.js";

// USERS
export async function getAllUsersService() {
  const users = await User.find({});
  return ApiSuccess.ok("All users fetched", { count: users.length, users });
}

export async function deleteUserService(userId) {
  const user = await User.findByIdAndDelete(userId);
  if (!user) throw ApiError.notFound("User not found");
  return ApiSuccess.ok("User deleted successfully");
}

// EVENTS
export async function getAllEventsService() {
  const events = await Event.find({});
  return ApiSuccess.ok("All events fetched", { count: events.length, events });
}

export async function deleteEventService(eventId) {
  const event = await Event.findByIdAndDelete(eventId);
  if (!event) throw ApiError.notFound("Event not found");
  return ApiSuccess.ok("Event deleted successfully");
}

// TICKETS
export async function getAllTicketsService() {
  const tickets = await Ticket.find({});
  return ApiSuccess.ok("All tickets fetched", { count: tickets.length, tickets });
}

export async function deleteTicketService(ticketId) {
  const ticket = await Ticket.findByIdAndDelete(ticketId);
  if (!ticket) throw ApiError.notFound("Ticket not found");
  return ApiSuccess.ok("Ticket deleted successfully");
}

export default {
  getAllUsersService,
  deleteUserService,
  getAllEventsService,
  deleteEventService,
  getAllTicketsService,
  deleteTicketService,
};

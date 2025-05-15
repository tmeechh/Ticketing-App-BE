import asyncWrapper from "../../middlewares/asyncWrapper.js";
import ticketService from "../services/ticket.service.js";

export const buyTicket = asyncWrapper(async (req, res) => {
  const response = await ticketService.purchaseTicket({ eventId: req.body.eventId, userId: req.user._id });
  res.status(response.status).json(response);
});

export const verifyTicketPayment = asyncWrapper(async (req, res) => {
  const response = await ticketService.confirmTicketPayment(req.query.reference);
  res.status(response.status).json(response);
});

export const getUserTickets = asyncWrapper(async (req, res) => {
  const response = await ticketService.getUserTickets(req.user._id);
  res.status(response.status).json(response);
});

export const refundTicket = asyncWrapper(async (req, res) => {
  const response = await ticketService.refundTicket(req.params.ticketId, req.user._id);
  res.status(response.status).json(response);
});

// src/v1/services/ticket.service.js

import Ticket from "../models/ticket.model.js";
import Event from "../models/event.model.js";
import { initializePayment, verifyPayment } from "./paystack.service.js";
import ApiError from "../../utils/apiError.js";

// 🔹 Buy a ticket
export async function purchaseTicket({ eventId, userId }) {
  const event = await Event.findById(eventId);
  if (!event) throw ApiError.notFound(`Event with ID ${eventId} not found`);
  if (event.ticketsAvailable <= 0) throw ApiError.badRequest(`Tickets for event '${event.name}' are sold out`);

  const paymentData = await initializePayment(userId, event.price);

  const ticket = await Ticket.create({
    event: eventId,
    user: userId,
    price: event.price,
    paymentReference: paymentData.reference,
  });

  return {
    status: 201,
    success: true,
    message: "Ticket purchase initialized",
    paymentLink: paymentData.authorization_url,
    ticket,
  };
}

// 🔹 Confirm payment success
export async function confirmTicketPayment(reference) {
  const payment = await verifyPayment(reference);
  if (payment.status !== "success") throw ApiError.badRequest("Payment failed");
  console.log("PAYMENT RESPONSE: ", payment);


  const ticket = await Ticket.findOneAndUpdate(
    { paymentReference: reference },
    { status: "paid" },
    { new: true }
  );


  const event = await Event.findById(ticket.event);
  if (event.ticketsAvailable > 0) {
    event.ticketsAvailable -= 1;
    await event.save();
  }

  return {
    status: 201,
    success: true,
    message: "Ticket purchase successful",
    ticket,
  };
}

// 🔹 Get user tickets
export async function getUserTickets(userId) {
  const tickets = await Ticket.find({ user: userId }).populate("event");

  return {
    status: 201,
    success: true,
    message: "Tickets retrieved successfully",
    tickets,
  };
}

export default {
  purchaseTicket,
  confirmTicketPayment,
  getUserTickets,
};

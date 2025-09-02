// src/v1/services/ticket.service.js

import Ticket from "../models/ticket.model.js";
import Event from "../models/event.model.js";
import { initializePayment, verifyPayment } from "./paystack.service.js";
import ApiError from "../../utils/apiError.js";

// 🔹 Buy a ticket
export async function purchaseTicket({ eventId, userId, ticketType, price, quantity }) {
  
  ticketType = ticketType?.toLowerCase().trim();
  quantity = quantity || 1;
  const event = await Event.findById(eventId);
  if (!event) throw ApiError.notFound(`Event with ID ${eventId} not found`);

  const validTypes = ["general", "vip", "premium", "free"];
  if (!validTypes.includes(ticketType)) {
    throw ApiError.badRequest("Invalid ticket type selected");
  }

   const basePrice = event.ticketPrices.get(ticketType);
  if (!basePrice) {
    throw ApiError.badRequest(`Price not set for ticket type ${ticketType}`);
  }

  
  const serviceCharge = Math.round(basePrice * 0.05); // 5% fee
  const totalPrice = (basePrice + serviceCharge) * quantity;


  const available = event.ticketsAvailable.get(ticketType);
  if (!available || available <= 0) {
    throw ApiError.badRequest(`${ticketType} tickets are sold out`);
  }


  // Initialize payment
  const paymentData = await initializePayment(userId, totalPrice);

  // Create the ticket
  const ticket = await Ticket.create({
    event: eventId,
    user: userId,
    ticketType,
    price: basePrice,
    serviceCharge,
    totalPaid: totalPrice,
    paymentReference: paymentData.reference,
    history: [
      { action: "created", note: "Ticket purchase initiated" }
    ],
  });
  

  // Reduce ticket count and save
  event.ticketsAvailable.set(ticketType, available - quantity);
  await event.save();

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

  ticket.status = "paid";
  ticket.history.push({
    action: "paid",
    note: "Payment verified",
  });
  await ticket.save();
  
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


export async function refundTicket(ticketId, userId) {
  const ticket = await Ticket.findOne({ _id: ticketId, user: userId }).populate('event');
  if (!ticket) throw ApiError.notFound("Ticket not found");

  const daysBeforeEvent = (new Date(ticket.event.date) - new Date()) / (1000 * 60 * 60 * 24);
  if (daysBeforeEvent < 14) throw ApiError.badRequest("Refunds are not allowed within 14 days of the event");

  if (ticket.status !== "paid") throw ApiError.badRequest("Only paid tickets can be refunded");

  ticket.status = "cancelled";
  ticket.history.push({
    action: "refunded",
    note: "Refund issued successfully",
  });
  
  await ticket.save();

  // Restore ticket availability by type
  const event = ticket.event;
  const currentAvailable = event.ticketsAvailable.get(ticket.ticketType) || 0;
  event.ticketsAvailable.set(ticket.ticketType, currentAvailable + 1);
  await event.save();

  return {
    status: 200,
    success: true,
    message: "Refund processed successfully",
    ticket,
  };
}

export default {
  purchaseTicket,
  confirmTicketPayment,
  getUserTickets,
  refundTicket,
};




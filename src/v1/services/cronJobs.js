import cron from "node-cron";
import Event from "../models/event.model.js";
import Ticket from "../models/ticket.model.js";
import emailService from "./email.service.js";

/**
 * Scheduled job to send email reminders to ticket holders before an event.
 */
const sendEventReminders = async () => {
  try {
    const upcomingEvents = await Event.find({
      date: { $gte: new Date(), $lte: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000) },
    });

    for (const event of upcomingEvents) {
      const tickets = await Ticket.find({ event: event._id }).populate("user");

      for (const ticket of tickets) {
        const user = ticket.user;
        await emailService.sendEventReminderEmail(user, event);
      }
    }
    console.log("Event reminders sent successfully.");
  } catch (error) {
    console.error("Error sending event reminders:", error);
  }
};

// Run every day at 9 AM UTC
cron.schedule("0 9 * * *", sendEventReminders, {
  timezone: "UTC",
});

export default sendEventReminders;

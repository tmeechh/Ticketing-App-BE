import fs from "fs";
import path from "path";
import handlebars from "handlebars";
import OTP from "../models/otp.model.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { formatDate, generateOTP } from "../../lib/utils.js";
import { sendEmail } from "../../lib/nodemailer.config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const templatesDir = path.join(__dirname, "..", "..", "templates");

const templatePaths = {
  otpTemplate: path.join(templatesDir, "OTPTemplate.html"),
  eventReminderTemplate: path.join(templatesDir, "EventReminderTemplate.html"),
};

const templates = Object.fromEntries(
  Object.entries(templatePaths).map(([key, filePath]) => [
    key,
    handlebars.compile(fs.readFileSync(filePath, "utf8")),
  ])
);


/**
 * Send event reminder email
 */
export async function sendEventReminderEmail(user, event) {
  try {
    const subject = `Reminder: Upcoming Event - ${event.title}`;
    const emailText = `Hello ${user.name},\n\nDon't forget! Your event "${event.title}" is happening on ${event.date}.\n\nSee you there!`;

    const html = templates.eventReminderTemplate({
      userName: user.name,
      eventTitle: event.title,
      eventDate: event.date.toDateString(),
      eventLocation: event.location || "Online",
      eventTime: event.time || "Check event details",
      date: new Date().toDateString(),
    });

    return sendEmail({ to: user.email, subject, text: emailText, html });
  } catch (error) {
    console.error("Error sending event reminder:", error);
    throw new Error("Failed to send event reminder email");
  }
}



export async function sendOTPEmail(email, userName, type = "otp") {
  try {
    await OTP.findOneAndDelete({ email });
    const otp = generateOTP();
    await OTP.create({ email, otp });

    const subject = type === "forgotPassword" ? "Reset Your Password" : "OTP Request";
    const templateFile = type === "forgotPassword" ? "forgot-password.html" : "OTPTemplate.html";


    const templatePath = path.join(templatesDir, templateFile);
    const templateSource = fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(templateSource);
    
    const date = formatDate(new Date().toLocaleString());
    const emailText = `Hello ${userName},\n\nYour OTP is: ${otp}`;
    const html = template({ userName, otp, date });


    return sendEmail({ to: email, subject, text: emailText, html });
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw ApiError.internalServerError("Failed to send OTP email");
  }
}

export default { sendOTPEmail, sendEventReminderEmail };

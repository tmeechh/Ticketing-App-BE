import express from "express";
import crypto from "crypto";
import Ticket from "../models/ticket.model.js";

const router = express.Router();

router.post("/paystack", express.json({ type: "*/*" }), async (req, res) => {
  const secret = process.env.PAYSTACK_SECRET_KEY;

  // Validate Paystack signature
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(401).send("Invalid signature");
    }
    
//      // Process event
//   const event = JSON.parse(req.body.toString());
//   console.log("Paystack Event:", event);

  const event = req.body;

  if (event.event === "charge.success") {
    const reference = event.data.reference;

    // Update ticket as paid
    const ticket = await Ticket.findOneAndUpdate(
      { paymentReference: reference },
      { status: "paid" },
      { new: true }
    );

    if (ticket) {
      ticket.history.push({ action: "paid", note: "Payment confirmed by webhook" });
      await ticket.save();
    }
  }

  res.sendStatus(200);
});

export default router;

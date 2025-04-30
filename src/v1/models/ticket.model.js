import mongoose from "mongoose";

const { Schema } = mongoose;

const TicketSchema = new Schema(
  {
    event: { type: mongoose.Schema.Types.ObjectId, ref: "Event", required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    price: { type: Number, required: true },
    status: { type: String, enum: ["pending", "paid", "cancelled"], default: "pending" },
    paymentReference: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Ticket", TicketSchema);

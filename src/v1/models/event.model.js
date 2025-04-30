import mongoose from "mongoose";

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    date: { type: Date, required: true },
    location: { type: String, required: true },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    image: { type: String, default: "" },
    price: { type: Number, required: true },
    ticketsAvailable: { type: Number, required: true },
  },
  { timestamps: true }
);

// 🔥 Add soldOut virtual
EventSchema.virtual("soldOut").get(function () {
  return this.ticketsAvailable <= 0;
});

// 🔥 Enable virtuals in JSON
EventSchema.set("toObject", { virtuals: true });
EventSchema.set("toJSON", { virtuals: true });

export default mongoose.model("Event", EventSchema);
 
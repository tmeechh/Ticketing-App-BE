import mongoose from 'mongoose';

const { Schema } = mongoose;

const TicketSchema = new Schema(
  {
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event',
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    price: { type: Number, required: true },
    status: {
      type: String,
      enum: ['pending', 'paid', 'cancelled'],
      default: 'pending',
    },
    paymentReference: { type: String },
    ticketType: {
      type: String,
      enum: ['general', 'vip', 'premium', 'free'],
      required: true,
    },
    history: [
      {
        action: {
          type: String,
          enum: ['created', 'paid', 'refunded'],
          required: true,
        },
        timestamp: {
          type: Date,
          default: Date.now,
        },
        note: {
          type: String,
          default: '',
        },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model('Ticket', TicketSchema);

import mongoose from 'mongoose';

const { Schema } = mongoose;

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    fullDescription: { type: String, required: true },
    category: {
      type: String,
      required: true,
      enum: [
        'Concerts',
        'Sports',
        'Conferences',
        'Theater',
        'Festivals',
        'Exhibitions',
      ],
    },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    location: { type: String, required: true },
    address: { type: String, required: true },
    organizer: { type: String, required: true },
    organizerId: {      // reference
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    images: [String],

    ticketPrices: {
      type: Map,
      of: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v.has('general') && v.has('vip') && v.has('premium');
        },
        message: 'Ticket prices must include General, VIP, and Premium',
      },
    },
    ticketsAvailable: {
      type: Map,
      of: Number,
      required: true,
      validate: {
        validator: function (v) {
          return v.has('general') && v.has('vip') && v.has('premium');
        },
        message: 'Tickets available must include General, VIP, and Premium',
      },
    },
  },
  { timestamps: true }
);

// 🔥 Add soldOut virtual
EventSchema.virtual('soldOut').get(function () {
  return this.ticketsAvailable <= 0;
});

// 🔥 Enable virtuals in JSON
EventSchema.set('toObject', { virtuals: true });
EventSchema.set('toJSON', { virtuals: true });

export default mongoose.model('Event', EventSchema);

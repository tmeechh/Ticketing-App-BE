import mongoose from 'mongoose';
import  Event  from './src/v1//models/event.model.js'; // Adjust path
import dotenv from 'dotenv';

dotenv.config();

async function updateEventsWithOrganizerId() {
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: 'TicketingAppCluster', // Replace with your DB name
    });

    console.log('✅ Connected to MongoDB.');

    const organizerId = new mongoose.Types.ObjectId('68291b27f6c9acee4721d87d');
    const events = await Event.find({ organizerId: { $exists: false } });

    console.log(`🔍 Found ${events.length} events to update.`);

    // Update with `{ validateBeforeSave: false }` to skip validation
    const updatePromises = events.map(event => {
      event.organizerId = organizerId;
      return event.save({ validateBeforeSave: false }); // Skip validation
    });

    await Promise.all(updatePromises);
    console.log('🎉 Successfully updated all events with organizerId:', organizerId);
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB.');
    process.exit(0);
  }
}

updateEventsWithOrganizerId();
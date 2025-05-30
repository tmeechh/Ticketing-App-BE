import Event from "../models/event.model.js";
import { uploadToCloudinary } from "./upload.service.js";
import ApiError from "../../utils/apiError.js";
import ApiSuccess from "../../utils/apiSuccess.js";
import fs from "fs/promises";


export async function createEvent(eventData, files) {
  if (files && files.length > 0) {
    const imageUrls = [];

    for (const file of files) {
      const url = await uploadToCloudinary(file.path);
      imageUrls.push(url);
      await fs.unlink(file.path); // delete temp file
    }

    eventData.images = imageUrls; // save array of URLs
  }
     // Convert ticket data to proper Map format
     const convertToMap = (data) => {
      if (typeof data === 'string') data = JSON.parse(data); 
      const map = new Map();
      Object.entries(data).forEach(([key, value]) => {
        map.set(key, Number(value));
      });
      return map;
    };

    eventData.ticketPrices = convertToMap(eventData.ticketPrices || eventData.ticketTypes);
    eventData.ticketsAvailable = convertToMap(eventData.ticketsAvailable);

  
  const event = await Event.create(eventData);
  console.log('Received ticketPrices:', eventData.ticketPrices);
  console.log('Received ticketsAvailable:', eventData.ticketsAvailable);
  return { 
    statusCode: 201,  
    success: true,
    message: "Event created successfully",
    event,
  };
}
export async function updateEvent(eventId, updateData, files) {
  if (files && files.length > 0) {
    const imageUrls = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file.path);
      imageUrls.push(url);
      await fs.unlink(file.path);
    }
    updateData.images = imageUrls;
  }

  // Add the same Map conversion as createEvent
  const convertToMap = (data) => {
    if (typeof data === 'string') data = JSON.parse(data);
    const map = new Map();
    Object.entries(data).forEach(([key, value]) => {
      map.set(key, Number(value));
    });
    return map;
  };

  updateData.ticketPrices = convertToMap(updateData.ticketPrices || updateData.ticketTypes);
  updateData.ticketsAvailable = convertToMap(updateData.ticketsAvailable);

  const event = await Event.findByIdAndUpdate(eventId, updateData, { 
    new: true 
  });

  if (!event) throw new ApiError(404, "Event not found");
  
  return {
    statusCode: 200,
    success: true,
    message: "Event updated successfully",
    event,
  };
}

/**
 * Get all events with optional filtering
 */
export async function getEvents(filter = {}) {
  const query = {};

  if (filter.category) {
    query.category = filter.category;
  }

  const events = await Event.find(query);
  return {
    statusCode: 200,
    success: true,
    message: "Events retrieved successfully",
    events,
  };
}


/**
 * Get a single event by ID
 */
export async function getEventById(eventId) {
  const event = await Event.findById(eventId);
  if (!event) throw ApiError.notFound("Event not found");
  return { 
    statusCode: 201, 
    success: true,
    message: "Event retrieved successfully",
    event,
  };
}

/**
 * Update an event by ID (with optional image update)
 */


/**
 * Delete an event by ID
 */
export async function deleteEvent(eventId) {
  const event = await Event.findByIdAndDelete(eventId);
  if (!event) throw ApiError.notFound("Event not found");
  return { 
    statusCode: 200, 
    success: true,
    message: "Event deleted successfully",
    
  };
}

export async function getOrganizerEvents(organizerId) {
  const events = await Event.find({ organizerId }) // Now using organizerId
    .sort({ createdAt: -1 })
    .lean();

  return {
    statusCode: 200,
    success: true,
    message: events.length ? "Events retrieved successfully" : "No events found",
    data: events,
  };
}

export default {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getOrganizerEvents
};

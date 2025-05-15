import Event from "../models/event.model.js";
import { uploadToCloudinary } from "./upload.service.js";
import ApiError from "../../utils/apiError.js";
import ApiSuccess from "../../utils/apiSuccess.js";


export async function createEvent(eventData, file) {
  if (file) {
    const imageUrl = await uploadToCloudinary(file.path);
    eventData.image = imageUrl;  
  }

  const event = await Event.create(eventData);

  return { 
    statusCode: 201,  
    success: true,
    message: "Event created successfully",
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
export async function updateEvent(eventId, updateData, file) {
  if (file) {
    const imageUrl = await uploadToCloudinary(file.path);
    updateData.image = imageUrl;  // Update Cloudinary URL
  }

  const event = await Event.findByIdAndUpdate(eventId, updateData, { new: true });
  if (!event) throw new ApiError(404, "Event not found");  


  if (!event) throw ApiError.notFound("Event not found");
  return { 
    statusCode: 200,  
    success: true,
    message: "Event updated successfully",
    event,
  };
}

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

export default {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
};

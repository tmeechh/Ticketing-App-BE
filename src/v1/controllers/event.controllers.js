import eventService from "../services/event.service.js";

/**
 * Controller for creating an event
 */
export async function createEvent(req, res, next) {
  try {
    console.log("Uploaded file:", req.file);  

    const response = await eventService.createEvent(req.body, req.file); 

    console.log("Response:", response);  
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for retrieving events
 */
export async function getEvents(req, res, next) {
  try {
    const response = await eventService.getEvents(req.query);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for retrieving a single event by ID
 */
export async function getEventById(req, res, next) {
  try {
    const response = await eventService.getEventById(req.params.id);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for updating an event by ID
 */
export async function updateEvent(req, res, next) {
  try {
    const response = await eventService.updateEvent(req.params.id, req.body, req.file); // Pass file
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
}

/**
 * Controller for deleting an event by ID
 */
export async function deleteEvent(req, res, next) {
  try {
    const response = await eventService.deleteEvent(req.params.id);
    res.status(response.statusCode).json(response);
  } catch (error) {
    next(error);
  }
}

export default {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent
};

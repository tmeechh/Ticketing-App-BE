// import eventService from '../services/event.service.js';

// /**
//  * Controller for creating an event
//  */
// export async function createEvent(req, res, next) {
//   try {
//     const response = await eventService.createEvent(req.body, req.files);

//     res.status(response.statusCode).json(response);
//   } catch (error) {
//     next(error);
//   }
// }

// /**
//  * Controller for retrieving events
//  */
// export async function getEvents(req, res, next) {
//   try {
//     const response = await eventService.getEvents(req.query);
//     res.status(response.statusCode).json(response);
//   } catch (error) {
//     next(error);
//   }
// }

// /**
//  * Controller for retrieving a single event by ID
//  */
// export async function getEventById(req, res, next) {
//   try {
//     const event = await eventService.getEventById(req.params.id);
//     res.status(event.statusCode).json(event);
//   } catch (error) {
//     next(error);
//   }
// }

// /**
//  * Controller for updating an event by ID
//  */
// export async function updateEvent(req, res, next) {
//   try {
//     const response = await eventService.updateEvent(
//       req.params.id,
//       req.body,
//       req.files
//     ); // Pass file
//     res.status(response.statusCode).json(response);
//   } catch (error) {
//     next(error);
//   }
// }

// /**
//  * Controller for deleting an event by ID
//  */
// export async function deleteEvent(req, res, next) {
//   try {
//     const response = await eventService.deleteEvent(req.params.id);
//     res.status(response.statusCode).json(response);
//   } catch (error) {
//     next(error);
//   }
// }

// /**
//  * Controller for retrieving events by organizer
//  */
// export async function getOrganizerEvents(req, res, next) {
//   try {
//     const response = await eventService.getOrganizerEvents(
//       req.params.organizerId
//     );
//     res.status(response.statusCode).json(response);
//   } catch (error) {
//     next(error);
//   }
// }

// export default {
//   createEvent,
//   getEvents,
//   getEventById,
//   updateEvent,
//   deleteEvent,
//   getOrganizerEvents,
// };


import eventService from "../services/event.service.js";

export async function createEvent(req, res, next) {
  try {
    console.log("📌 Creating Event...");
    console.log("📝 Body:", req.body);
    if (req.files?.length) console.log("📷 Uploaded files:", req.files.map(f => f.originalname));

    const response = await eventService.createEvent(req.body, req.files);

    console.log("✅ Event created:", response);
    res.status(response.statusCode).json(response);
  } catch (err) {
    console.error("❌ [CREATE EVENT ERROR]", err.message, err.stack);
    next(err);
  }
}

export async function getEvents(req, res, next) {
  try {
    console.log("📌 Fetching Events with query:", req.query);
    const response = await eventService.getEvents(req.query);
    res.status(response.statusCode).json(response);
  } catch (err) {
    console.error("❌ [GET EVENTS ERROR]", err.message, err.stack);
    next(err);
  }
}

export async function getEventById(req, res, next) {
  try {
    console.log("📌 Fetching Event:", req.params.id);
    const event = await eventService.getEventById(req.params.id);
    res.status(event.statusCode).json(event);
  } catch (err) {
    console.error("❌ [GET EVENT BY ID ERROR]", err.message, err.stack);
    next(err);
  }
}

export async function updateEvent(req, res, next) {
  try {
    console.log("📌 Updating Event:", req.params.id);
    console.log("📝 Body:", req.body);
    if (req.files?.length) console.log("📷 Updated files:", req.files.map(f => f.originalname));

    const response = await eventService.updateEvent(req.params.id, req.body, req.files);
    res.status(response.statusCode).json(response);
  } catch (err) {
    console.error("❌ [UPDATE EVENT ERROR]", err.message, err.stack);
    next(err);
  }
}

export async function deleteEvent(req, res, next) {
  try {
    console.log("📌 Deleting Event:", req.params.id);
    const response = await eventService.deleteEvent(req.params.id);
    res.status(response.statusCode).json(response);
  } catch (err) {
    console.error("❌ [DELETE EVENT ERROR]", err.message, err.stack);
    next(err);
  }
}

export async function getOrganizerEvents(req, res, next) {
  try {
    console.log("📌 Fetching events for Organizer:", req.params.organizerId);
    const response = await eventService.getOrganizerEvents(req.params.organizerId);
    res.status(response.statusCode).json(response);
  } catch (err) {
    console.error("❌ [GET ORGANIZER EVENTS ERROR]", err.message, err.stack);
    next(err);
  }
}

export default {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getOrganizerEvents
};

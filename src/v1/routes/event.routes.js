

import express from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent, getOrganizerEvents } from "../controllers/event.controllers.js";
import { isAuth } from "../../middlewares/auth.js";
import { onlyOrganizers } from "../../middlewares/authorie.js";
import { uploadEventImages } from "../../middlewares/upload.middleware.js";  

const router = express.Router();

router.route("/")
  .post(isAuth, onlyOrganizers, uploadEventImages, createEvent)  
  .get(getEvents);

  router.route("/organizer/:organizerId")
  .get(isAuth, onlyOrganizers, getOrganizerEvents);

router.route("/:id")
  .get(getEventById)
  .patch(isAuth, onlyOrganizers, uploadEventImages, express.json(), updateEvent)
  .delete(isAuth, onlyOrganizers, deleteEvent); 

export default router;

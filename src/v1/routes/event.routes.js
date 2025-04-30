import express from "express";
import { createEvent, getEvents, getEventById, updateEvent, deleteEvent } from "../controllers/event.controllers.js";
import { isAuth } from "../../middlewares/auth.js";
import { uploadImage } from "../../middlewares/upload.middleware.js";  

const router = express.Router();

router.route("/")
  .post(isAuth, uploadImage, createEvent)  
  .get(getEvents);

router.route("/:id")
  .get(getEventById)
  // .patch(isAuth, uploadImage, updateEvent) 
  .patch(isAuth, uploadImage, express.json(), updateEvent)
  .delete(isAuth, deleteEvent);

export default router;

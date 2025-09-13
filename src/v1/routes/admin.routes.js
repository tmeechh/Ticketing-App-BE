// src/v1/routes/admin.routes.js
import express from 'express';

import { isAuth } from "../../middlewares/auth.js";
import { onlyAdmins } from "../../middlewares/authorize.js";
import {
  getAllTickets,
  deleteTicket,
  getAllEvents,
  deleteEvent,
  getAllUsers,
  deleteUser,
} from '../controllers/admin.controllers.js';

const router = express.Router();

// USERS
router.get("/users", isAuth, onlyAdmins, getAllUsers);
router.delete("/users/:id", isAuth, onlyAdmins, deleteUser);

// EVENTS
router.get("/events", isAuth, onlyAdmins, getAllEvents);
router.delete("/events/:id", isAuth, onlyAdmins, deleteEvent);

// TICKETS
router.get("/tickets", isAuth, onlyAdmins, getAllTickets);
router.delete("/tickets/:id", isAuth, onlyAdmins, deleteTicket);

export default router;

import express from "express";
import { buyTicket, verifyTicketPayment, getUserTickets } from "../controllers/ticket.controller.js";
import { isAuth } from "../../middlewares/auth.js";

const router = express.Router();

router.route("/buy").post(isAuth, buyTicket);
router.route("/verify").get(verifyTicketPayment);
router.route("/my-tickets").get(isAuth, getUserTickets);

export default router;

const express = require('express');
const ticketController = require('../controller/ticket.controller');
const auth = require('../middleware/auth');
const router = express();

router.post("/book-ticket", auth.protect, ticketController.purchase);
router.get("/getalltickets", auth.protect, ticketController.getAllTicket);
router.get("/getticket/:id", auth.protect, ticketController.getTicketDetails);
router.put("/updateticket/:id",  auth.protect, ticketController.updateTicket);
router.delete("/deleteticket/:id",  auth.protect, ticketController.deleteTicket);

module.exports = router;
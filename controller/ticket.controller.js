const Ticket = require('../models/ticket.models');//from models
 
exports.purchase = async (req, res, next) => {
    try{
       const {
            eventTitle,
            eventDate,
            venue,
            seatNumber ,
            ticketPrice ,
            purchaseNumber ,
            status
} = req.body;

//check if ticket exists already
const existingTicket = await Ticket.findOne({ eventTitle });

if (existingTicket) {
    return next(new Error("Ticket already exist, 400"));
}

//create a new ticket
const ticket = new Ticket ({
            eventTitle,
            eventDate,
            venue,
            seatNumber ,
            ticketPrice ,
            purchaseNumber ,
            status
});

const result = await ticket.save();

res.status(201).json({
    message : "purchased successfully", result
});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},


//all the endpoints
exports.getAllTicket /*import to route*/ = async (req, res, next) => {
   try {
    const tickets = await Ticket.find().sort({ createAt : -1 });
    res.status(200).json({
        success: true,
        count: tickets.length,
        tickets
    });
   } catch (error) {
    res.status(500).json({ error: error.message });
   }
},

exports.getTicketDetails /*import to route*/ = async (req, res, next) => {
    try{
        const { id } = req.params;
        const tickets = await Ticket.findById(id);

        //if a ticket doesnt exist in the db we should throw an error
        if (!Ticket) {
        return res.status(404).json({ error: "ticket not found"});
        }

        res.status(200).json({
            success: true,
            tickets
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

exports.updateTicket /*import to route*/ = async (req, res, next ) => {
    try {
        const { id } = req.params;

        const updateTicket = await Ticket.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        });

        if (!updateTicket) {
            return res.status(404).json({ error: " ticket not found"});
        }

        res.status(200).json({
            success: true,
            message: "ticket updated successfully",
            ticket: updateTicket
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
},

exports.deleteTicket /*import to route*/ = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        const ticket = await Ticket.findByIdAndDelete(id);

        if (!ticket) {
            return res.status(404).json({ error: "Ticket not found"});
        }

        res.status(200).json({
            success: true,
            message: "Ticket Deleted Successfully"
        });
    }   catch (error) {
        res.status(500).json({ error: error.message });
    }
}

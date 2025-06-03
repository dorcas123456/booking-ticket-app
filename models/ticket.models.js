const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema ({
    eventTitle : {
          type : String,
          required : [true, "please provide event title"]
    },

    eventDate : {
         type : Date,
         required : [true, "please provide event date"]
    },

    venue : {
        type : String,
        required : [true, "please provide venue"]
    },

    seatNumber : {
        type : Number,
        required : [true, "please provide seat number"]
    },

    ticketPrice : {
        type : String,
        required : [true, "please provide ticket price"]
    },

    purchaseNumber : {
          type : Number,
          required : [true, "please provide purchase Number"]
    },

    status : {
        type : String,
        enum : ["available", "not available"]
    }
}, { timestamps: true});


const Ticket = mongoose.model("Ticket", ticketSchema);

module.exports = Ticket; //to controller


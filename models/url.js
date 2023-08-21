const mongoose = require("mongoose");

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectUrl: {
        type: String,
        required: true
    },
},{ timestamp: true});

const URL=mongoose.model('discordUrlShortner',urlSchema);
module.exports={URL};
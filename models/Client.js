const mongoose = require("mongoose");
const ClientSchema = new mongoose.Schema({
  client_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true

  },
  client_name: {
    type: String,
    required: true,
    unique: true
  },
  client_email: {
    type: String,
    required: true,
  },
  client_country: {
    type: String
  },
  client_address: {
    type: String
  },
  client_date: {
    type: Date,
    default: Date.now
  }

});

module.exports = Client = mongoose.model("client", ClientSchema)

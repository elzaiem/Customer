const mongoose = require("mongoose");
const InvoiceSchema = new mongoose.Schema({
  invoice_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  invoice_no: {
    type: String,
    unique: true
  },
  invoice_date: {
    type: Date,

  },
  invoice_client_no: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "clients",

  },
  invoice_total: {
    type: Number
  },
  invoice_post: {
    type: Boolean,
    default: false
  }
});

module.exports = Invoice = mongoose.model("invoice", InvoiceSchema)
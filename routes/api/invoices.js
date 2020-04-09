const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Invoice = require("../../models/Invoice");
const auth = require("../../middleware/auth");
//@rout Post api/invoices
//@Desc Post Rout
//@access Public
//router.get("/", (req, res) => res.send("Auth Router"));

router.post("/", auth,
  [
    check("invoice_no", "Enter invoice no").not().isEmpty(),
    check("invoice_date", "Enter Date").not().isEmpty(),
    check("invoice_client_no", "Enter Client No").not().isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { invoice_no, invoice_date, invoice_client_no, invoice_total, invoice_post } = req.body
    const my_user = req.user.id;
    const invoiceFields = {};
    invoiceFields.invoice_user = my_user;
    if (invoice_no) invoiceFields.invoice_no = invoice_no;
    if (invoice_date) invoiceFields.invoice_date = invoice_date;
    if (invoice_client_no) invoiceFields.invoice_client_no = invoice_client_no
    if (invoice_post) invoiceFields.invoice_post = invoice_post;
    if (invoice_total) invoiceFields.invoice_total = invoice_total;
    try {
      let invoice = await Invoice.findOne({ invoice_no });
      if (invoice) {
        //update
        invoice = await Invoice.findOneAndUpdate(
          { invoice_no },
          { $set: invoiceFields },
          { new: true }
        );
        return res.json({ invoice });

      }

      invoice = new Invoice(invoiceFields);
      await invoice.save();
      return res.json({ invoice })
    }
    catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  });


module.exports = router;
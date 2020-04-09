const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Client = require("../../models/Client");
const auth = require("../../middleware/auth");

//@rout Post api/clients
//@Desc  create or Update a Client
//@access Private
// (req, res) => res.send("Auth Router"))
router.post("/", auth,
  [
    check("client_name", "Enter the client Name").not().isEmpty(),
    check("client_email", "Enter a valid email").isEmail(),
    check("client_country", "Enter the country of the client").not().isEmpty()
  ]
  , async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { client_name, client_email, client_country, client_address } = req.body;
    const my_user = req.user.id;
    const clientFields = {};
    clientFields.client_user = my_user;
    if (client_name) clientFields.client_name = client_name;
    if (client_email) clientFields.client_email = client_email;
    if (client_country) clientFields.client_country = client_country;
    if (client_address) clientFields.client_address = client_address;
    try {

      let client = await Client.findOne({ client_name });
      if (client) {
        //update
        client = await Client.findOneAndUpdate(
          { client_name },
          { $set: clientFields },
          { new: true }
        );
        return res.json({ client });
      }

      client = new Client(clientFields);
      await client.save()
      return res.json({ client });

    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }

  }
);

//@rout Get api/clients
//@Desc  Get all clients
//@access public

router.get("/", async (req, res) => {
  try {
    const clients = await Client.find().populate("users", ["name", "email"]);
    res.json(clients)

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//@rout Get api/clients/user
//@Desc  Get client by Id of user
//@access private

router.get("/user", auth, async (req, res) => {
  try {
    const client = await Client.find({ client_user: req.user.id }).populate("user", ["name", "email"]);
    if (!client) return res.status(400).json({ msg: "No Clients related to this user" })

    res.json(client)

  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "No Client Found" })
    }
    res.status(500).send("Server Error");
  }
});


//@rout Delete api/clients/user
//@Desc  Delete a client by Id of user
//@access private

router.delete("/user/:cid", auth, async (req, res) => {
  try {
    await Client.findOneAndRemove({ _id: req.params.cid });
    if (!client) return res.status(400).json({ msg: "No Clients related to this user" })

    return res.json({ msg: "Client Deleted" })

  } catch (err) {
    console.error(err.message);
    if (err.kind == "ObjectId") {
      return res.status(400).json({ msg: "No Client Found" })
    }
    res.status(500).send("Server Error");
  }
});


module.exports = router;
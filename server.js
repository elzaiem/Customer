const express = require("express");
const connectDB = require("./config/db");

const app = express();

// Connect Database
connectDB();

// Init Middleware

app.use(express.json({ extended: false }));

app.get("/", (req, res) => res.send("API Running"));

// Define Routes

app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/clients", require("./routes/api/clients"));
app.use("/api/invoices", require("./routes/api/invoices"))

const PORT = process.env.port || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

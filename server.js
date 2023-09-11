const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const passport = require("passport");
const cookieSession = require("cookie-session");
const session = require("express-session");
const mainRoutes = require("./routes/main");
const userRoutes = require("./routes/users");
const markerRoutes = require('./routes/markers')
var cors = require('cors')

//==============================================
const PORT = process.env.PORT || 8000;

connectDB();

const app = express();
app.use(cors())
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
);

app.use(bodyParser.json());
app.use("/", mainRoutes);
app.use("/user", userRoutes);
app.use("/markers", markerRoutes)

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    const path = require("path");
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

module.exports = app.listen(PORT, () => {
    console.log(`Node.js listening on port 8000`);
});


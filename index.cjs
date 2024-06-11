const {connection} = require("./database/Connection.cjs");
const express = require("express");
const cors = require("cors");
connection();
const app = express();
const port = 3900;
app.use(cors());
app.use(express.urlencoded({extended: true}));

const userRoutes = require("./routes/user.cjs");
const plateRoutes = require("./routes/plate.cjs");
const orderRoutes = require("./routes/order.cjs");
const addressRoutes = require("./routes/address");
app.use("/api/user", userRoutes);
app.use("/api/plate", plateRoutes);
app.use("/api/order", orderRoutes);
app.use("/api/address", addressRoutes);
app.listen(port);

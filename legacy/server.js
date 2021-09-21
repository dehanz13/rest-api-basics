require("dotenv").config();

// pull in the express library
const express = require("express");
// run express function which will create an app variable that we can use to configure our server
const app = express();
//connect to mongoDB
const mongoose = require("mongoose");
// middleware: any request we get from a server, body-parser allows us to parse it using JSON
const bodyParser = require("body-parser");

// connect to the DB
mongoose.connect("mongodb://localhost/subsribers", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });
// try {
//   await mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
// } catch (error) {
//   console.log("ERROR: " + Error);
// }
// mongoose
//   .connect(process.env.DATABASE_URL, { useNewUrlParser: true })
//   .catch((error) => console.log(error));

// hook up events to run when our database is connected.
const db = mongoose.connection;

// once db connects,
db.once("open", () => console.log("Connected to Database..."));
// if db can't connect
db.on("error", console.error.bind(console, "connection error:"));
// db.on("error", (error) => console.error(error));

// set up the server to accept JSON, with use() that will utilize any middleware that we want, which is essentially a code that runs when the server gets a request but before it gets passed to the routes
// app.use(express.json());
app.use(bodyParser.json());

// set up some routes
const subscribersRouter = require("./routes/subscribers");
app.use("/subscribers", subscribersRouter);

// connect to the server
app.listen(3000, () => console.log("Server has Started!"));

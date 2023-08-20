require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./routes/users");
const concertRoutes = require("./routes/concerts");
const cors = require("cors");

const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/users", userRoutes);
app.use("/api/concerts", concertRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("listening on port 4000...");
    });
  })
  .catch((err) => {
    console.log(err);
  });

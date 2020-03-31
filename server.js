const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const port = process.env.PORT || 5000;

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => console.log("DB Connected!"))
  .catch(err => {
    console.log(`DB Connection Error: ${err.message}`);
  });

app.use(cors());
app.use(express.json());

/*Adds the react production build to serve react requests*/
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
}
// Body Parser Middleware:
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*******ROUTES****** */
const dictRouter = require("./routes/dictionary");
app.use("/dictionary", dictRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

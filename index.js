const express = require("express");
const app = express();
const userRoute = require("./routes/userRoute.js");
const carRoute = require("./routes/carRoute.js");
const authRoute = require("./routes/authRoute.js");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
dotenv.config();

app.use(cookieParser());
app.use(express.json());
app.use(userRoute);
app.use(carRoute);
app.use(authRoute);

app.listen(3000, () => {
  console.log("App listening on port 3000");
});

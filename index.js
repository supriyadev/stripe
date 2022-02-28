const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/product");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");
const bodyparser = require('body-parser');
const cors = require("cors");
const path=require("path");
dotenv.config();
mongoose
  .connect('mongodb://localhost/stripe-info')
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });


//   app.use(bodyparser.urlencoded({extended:false})) 
//   app.use(bodyparser.json()) 
app.set('views', path.join(__dirname, 'views')) ;
app.set('view engine', 'ejs') ;
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log("Backend server is running!");
});

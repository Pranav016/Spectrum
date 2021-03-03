const express = require("express");
const app = express();
const port = 8000;

//routes
const homeRoute = require("./routes"); //by default requires index file


//using middlewares
app.use("/", homeRoute);



app.listen(port, function (err) {
  if (err) {
    console.log(`Error: ${err}`);
  }
  console.log(`Server started on port ${port}`);
});

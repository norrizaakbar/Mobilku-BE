const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");
const routes = require("./router");
app.use(cors());
// app.use(express.urlencoded({ extended: true }));
app.use(
  express.urlencoded({ limit: "50mb", extended: true, parameterLimit: 5000 })
);
app.use(express.json());

app.use(routes);

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});

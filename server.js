const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require('./middleware/errorHandler');


const app = express();
const port = process.env.PORT || 2342;
require('dotenv').config();


connectDb();

app.use(express.json());
app.use("/user", require('./routes/userRoutes'));
app.use("/note",require("./routes/noteRoutes"));
app.use(errorHandler);
app.listen(port, ()=>{
    console.log(`Server running on port: ${port}`);
})

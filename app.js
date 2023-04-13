// Require in and use the .env
// Thanks Unit_5 CharacterCreator
require("dotenv").config();
const express = require('express');
const app = express();
const PORT = process.env.PORT;
const clog = console.log;
app.use(express.json());

// Controllers
const blog = require("./controllers/routes")

// Middleware
app.use(express.json());

// Routes
app.use("/blog", blog);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
require("dotenv").config();
const express = require("express");
const { connectDB } = require("./src/config/db");
const cors = require('cors');
const projectsRouter = require("./src/api/routes/Project");
const profileRouter = require("./src/api/routes/Profile");
const skillRouter = require("./src/api/routes/Skill");
const certificateRouter = require("./src/api/routes/Certificate");
const contactRouter = require("./src/api/routes/Contact");


const app = express();

connectDB();

app.use(cors());
app.use(express.json())

app.use("/api", projectsRouter);
app.use("/api", profileRouter);
app.use("/api", skillRouter);
app.use("/api", certificateRouter);
app.use("/api", contactRouter);

app.use("*", (req, res, next) => {
    return res.status(404).json("Rute not found")
})

app.listen(3000, () => {
    console.log("http://localhost:3000");
})
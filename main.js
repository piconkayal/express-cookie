require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
    express.json(),
    cors({
        credentials: true,
        origin: ["https://codesandbox.io", "https://*.csb.app", "csb.app", "*.csb.app", "https://0vvuxr.csb.app", "https://static-cookie-app.onrender.com"],
    }),
    cookieParser(),
);


var timeToAdd = 1000 * 60 * 60 * 24 * 7 * 4 * 6;
var date = new Date();
var expiryTime = parseInt(date.getTime()) + timeToAdd;
date.setTime(expiryTime);
var utcTime = date.toUTCString();

app.post("/login", async (req, res) => {
    res
        .cookie("x-cookie", "123456", {
            domain: "https://static-cookie-app.onrender.com",
            expires: utcTime,
            maxAge: expiryTime,
            httpOnly: false,
            sameSite: true,
            secure: true,
        })
        .json({ message: "Hello World" });
});

app.get("/info", (req, res) => res.json({ hello: "world" }));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});

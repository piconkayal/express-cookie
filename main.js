require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
    express.json(),
    cors({
        credentials: true,
        origin: [/\.csb\.app$/, /\.onrender\.com$/],
    }),
    cookieParser(),
);


const timeToAdd = 1000 * 60 * 60 * 24 * 7 * 4 * 6;
const date = new Date();
const expiryTime = parseInt(date.getTime()) + timeToAdd;
date.setTime(expiryTime);

const maxAge = 3600;
const expires = date;

console.log({ maxAge, expires })

app.post("/login", async (req, res) => {
    res
        .cookie("x-cookie", "123456", {
            domain: 'onrender.com',
            expires,
            maxAge,
            httpOnly: true,
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

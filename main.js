require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.set('trust proxy', 1) ;

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

const maxAge = 5184000000 // 2 months;
const expires = date;


app.post("/login", async (req, res) => {
    console.log({ maxAge, expires });
    
    res
        .cookie("x-cookie", "123456", {
            domain: 'static-cookie-app.onrender.com',
            expires,
            maxAge,
            httpOnly: true,
            sameSite: 'None',
            secure: true,
        })
        .json({ message: "Hello World" });
});

app.get("/info", (req, res) => res.json({ hello: "world" }));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});

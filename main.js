require('dotenv').config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
    express.json(),
    cors({
        credentials: true,
        origin: ["https://codesandbox.io"],
        exposedHeaders: ["Set-Cookie"],
    }),
    cookieParser(),
);

app.post("/login", async (req, res) => {
    res
        .cookie("x-cookie", "123456", {
            expires: new Date(Date.now() + 900000),
            httpOnly: false,
            sameSite: "None",
            secure: true,
        })
        .json({ message: "Hello World" });
});

app.get("/info", (req, res) => res.json({ hello: "world" }));

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Running on http://localhost:${PORT}`);
});

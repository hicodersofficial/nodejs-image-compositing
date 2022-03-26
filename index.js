const express = require("express");
const app = express();
const sharp = require("sharp");
const path = require("path");

app.use(express.json());
app.use("/public", express.static("./public"));

app.get("/watermark/:filename", async (req, res, next) => {
  try {
    const { filename } = req.params;

    const image = await sharp(path.join(__dirname, "public", filename))
      .composite([
        {
          input: path.join(__dirname, "logo", "logo.png"),
          tile: true,
        },
      ])
      .toBuffer();
    res.setHeader("content-type", "image/png");
    res.send(image);
  } catch (error) {
    next();
  }
});

app.listen(5000, () => {
  console.log("Listening on port 5000.");
});

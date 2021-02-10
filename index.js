const Express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = Express();
app.use(bodyParser.json());
app.use(cors());
app.use(Express.static("images"));
let url;
const Storage = multer.diskStorage({
  destination(req, file, callback) {
    callback(null, "./images");
  },
  filename(req, file, callback) {
    const filename = `${file.fieldname}_${Date.now()}_${file.originalname}`;
    callback(null, filename);
    url = `https://image-url-2021.herokuapp.com/${filename}`;
  },
});

const upload = multer({ storage: Storage });

app.get("/", (req, res) => {
  res.status(200).send("You can post to /api/upload.");
});

app.post("/api/upload", upload.array("photo", 3), (req, res) => {
  console.log("file", req.files);
  console.log("body", req.body);
  res.status(200).json({
    message: "success!",
    url: url,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("App running on http://localhost:3000");
});

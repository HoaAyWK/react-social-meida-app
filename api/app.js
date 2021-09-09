require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require('cors');
const multer = require('multer');

const authRoute = require('./routes/auth');
const postRoute = require('./routes/post');

const app = express();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
  } else {
      cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  limits: {

      fileSize: 1024*1024*5
  },
  fileFilter: fileFilter
});

try {
  mongoose.connect(
    process.env.MONGO_ATLAS_URL,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    },
    () => console.log("Mongoose is connected")
  );
} catch (err) {
  console.log("Could not connected");
}

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json({message: "File uploded successfully"});
  } catch (error) {
    console.error(error);
  }
});

app.use('/api', authRoute);
app.use('/api/posts', postRoute);

app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
}, (error, req, res, next) => {
    res.status(error.status || 500)
    .json({message: error.message});
});

module.exports = app;

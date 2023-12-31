const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");
const multer = require("multer");
const fs = require("fs");

const User = require("./models/User");
const Place = require("./models/Place");

const app = express();

dotenv.config();

const PORT = process.env.PORT;

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(express.json());
app.use(cookieParser());
const photosMiddleware = multer({ dest: "uploads" });

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Failed to connect to DB.", err));

app.get("/", (req, res) => {
  res.json({ msg: "Home Page" });
});

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const checkUser = await User.findOne({ email });
  if (checkUser) {
    res.json({ msg: "User already exists", registered: false });
  } else {
    const hashPassword = bcrypt.hashSync(password, 10);
    const userDoc = await User.create({
      name,
      email,
      password,
      hashPassword,
    });
    res.json({ userDoc, registered: true });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userDoc = await User.findOne({ email });
    if (!userDoc) {
      res.json({ msg: "Invalid username.", loggedIn: false });
    } else {
      const checkPassword = bcrypt.compareSync(password, userDoc.hashPassword);
      if (!checkPassword) {
        res.json({ msg: "Invalid password.", loggedIn: false });
      } else {
        jwt.sign(
          { name: userDoc.name, email: userDoc.email, id: userDoc._id },
          process.env.JWT_SECRET,
          {},
          (err, token) => {
            if (err) throw err;
            res.cookie("token", token).json({ userDoc, token, loggedIn: true });
          }
        );
      }
    }
  } catch (err) {
    res.json({ msg: "Token not found" });
  }
});

app.get("/profile", async (req, res) => {
  try {
    const { token } = req.cookies;
    jwt.verify(token, process.env.JWT_SECRET, {}, async (err, data) => {
      if (err) throw err;
      const { name, email, _id } = await User.findById(data.id);
      res.json({ name, email, _id });
    });
  } catch (err) {
    res.json({ msg: "Got an error.", Error: err });
  }
});

app.post("/logout", async (req, res) => {
  try {
    res.cookie("token", "").json({ loggedIn: false });
  } catch (err) {
    res.json({ msg: "No token" });
  }
});

app.post("/upload-photo-by-link", async (req, res) => {
  try {
    const { link } = req.body;
    const newName = Date.now() + ".jpg";
    const options = {
      url: link,
      dest: __dirname + "/uploads/" + newName,
    };
    console.log(options.dest);
    const resp = await imageDownloader.image(options);
    res.json({ resp, options, link: newName });
  } catch (error) {
    res.json({ msg: error });
  }
});

app.post(
  "/upload-photo-from-device",
  photosMiddleware.array("photos", 100),
  async (req, res) => {
    const uploadedFiles = [];
    for (let i = 0; i < req.files.length; i++) {
      const { originalname, path } = req.files[i];
      const parts = originalname.split(".");
      const ext = parts[parts.length - 1];
      const newPath = path + "." + ext;
      fs.renameSync(path, newPath);
      uploadedFiles.push(newPath.replace("uploads\\", ""));
    }
    res.json(uploadedFiles);
  }
);

app.post("/places", async (req, res) => {
  const { token } = req.cookies;
  const { title, address, addedPhotos, desc } = req.body;
  console.log(addedPhotos);
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const placeDoc = await Place.create({
      owner: userData.id,
      title,
      address,
      photos: addedPhotos,
      desc,
    });
    res.json(placeDoc);
  });
});

app.get("/places", async (req, res) => {
  const { token } = req.cookies;
  jwt.verify(token, process.env.JWT_SECRET, {}, async (err, userData) => {
    if (err) throw err;
    const { id } = userData;
    const userDoc = await User.find({ _id: id });
    console.log(userDoc);
    const places = await Place.find({ owner: id });
    console.log(places);
    res.json(places);
  });
});

app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});

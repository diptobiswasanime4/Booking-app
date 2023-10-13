const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const imageDownloader = require("image-downloader");

const User = require("./models/User");

const app = express();

const PORT = 3000;

dotenv.config();

app.use("/uploads", express.static(__dirname + "/uploads"));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(cookieParser());

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
    res.json({ resp, options });
  } catch (error) {
    res.json({ msg: error });
  }
});
app.listen(PORT, () => {
  console.log(`App running on PORT ${PORT}`);
});

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const helmet = require("helmet");
const morgan = require("morgan");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const cloudinary = require("./cloudinary/cloudinary");

const multer = require("multer");
const path = require("path");

const app = express();
mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connect to Mongo DB");
});

app.use("/images", express.static(path.join(__dirname, "public/images")));

// Middle ware
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan("common"));

// post image file

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.get("/api/images", async (req, res) => {
  const { resources } = await cloudinary.search
    .expression("folder:User_Avatar")
    .sort_by("public_id", "desc")
    .max_results(30)
    .execute();
  const publicIds = resources.map((file) => file.public_id);
  res.status(200).json(publicIds);
});

app.post("/api/uploadimage/:userId", async (req, res) => {
  try {
    const image = req.body.image;
    await cloudinary.uploader.upload(image, {
      upload_preset: "user_avatar",
      public_id: `${req.params.userId}`,
      allowed_formats: ["png", "jpeg", "jpg"],
    });
    res.status(200).json("Upload successfully");
  } catch (err) {
    res.status(400).json(err);
  }
});

app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);

app.listen(process.env.PORT, () => {
  console.log(`App is running on ${process.env.PORT}...`);
});

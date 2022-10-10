const express = require("express");
const app = express();
const router = express.Router();

const Grid = require("gridfs-stream");
const mongoose = require("mongoose");

const upload = require("../middleware/upload");
const { conn } = require("../db.configs/db");

const Car = require("../models/car.models");
const User = require("../models/user.models");

const baseURL = "http://192.168.1.3:4000/file/";

conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "assets",
  });
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection("assets");
});

router.get("/", async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/:id", (req, res) => {
  Car.findById(req.params.id, (err, car) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!car) {
      return res.status(404).json({ message: "Car doesn't exist!" });
    }
    res.json(car);
  });
});

router.get("/by_user/:id", (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) {
      return res.status(500).send({ message: err });
    }
    if (!user) {
      return res.status(404).json({ message: "User doesn't exist!" });
    } else {
      Car.find({ user_id: req.params.id }, (err, car) => {
        if (err) {
          return res.status(500).send(err);
        }
        if (car.length != 0) {
          console.log(car);
          return res.status(200).json(car);
        } else {
          return res.status(200).json({ message: "Empty List!" });
        }
      });
    }
  });
});

// To recieve uploaded car image
router.get("/file/:filename", async (req, res) => {
  // console.log(gfs.files);
  // console.log(req.params.filename); // 1663839024551-cover.jpg

  gfs.files.findOne({ filename: req.params.filename }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (!result) {
      return res.status(404).json({ message: "File Not Found" });
    }
    // const readStream = gfs.createReadStream(result.filename);
    // const readStream = gfs.openDownloadStream(result.filename);
    const readStream = gridfsBucket.openDownloadStreamByName(result.filename);
    readStream.pipe(res);
  });
});

// To save a Car with image
router.post("/", upload.single("image"), async (req, res) => {
  const body = req.body;
  // console.log(req.file);
  console.log(body);
  console.log(req.file);
  // res.status(201).json({ message: "Car Details Saved Successfully!!!" });

  let car;

  if (req.file) {
    const imgUrl = baseURL + `${req.file.filename}`;
    car = new Car({
      reg_no: body.reg_no,
      image: imgUrl,
      brand: body.brand,
      color: body.color,
      fuel: body.fuel,
      mileage: body.mileage,
      user_id: body.user_id,
    });
  } else {
    car = new Car({
      reg_no: body.reg_no,
      image: "null",
      brand: body.brand,
      color: body.color,
      fuel: body.fuel,
      mileage: body.mileage,
      user_id: body.user_id,
    });
  }

  car.save((err, result) => {
    if (err) {
      if (err.errors) {
        return res.status(500).json({ message: err.message });
      }
    }
    res.status(201).json({ message: "Car Details Saved Successfully!!!" });
  });
});

router.put("/:id", upload.single("image"), async (req, res) => {
  const body = req.body;
  console.log(body);
  console.log(req.file);

  Car.findById(req.params.id, (err1, carDetails) => {
    if (err1) {
      return res.status(500).json({ message: err1 });
    }
    if (!carDetails) {
      return res.status(404).json({ message: "No such Car!" });
    }

    if (req.file) {
      const imgUrl = baseURL + `${req.file.filename}`;
      carDetails.headline = body.headline;
      carDetails.image = imgUrl;
      carDetails.brand = body.brand;
      carDetails.color = body.color;
      carDetails.fuel = body.fuel;
      carDetails.mileage = body.mileage;
      carDetails.user_id = body.user_id;
    } else {
      carDetails.headline = body.headline;
      carDetails.image = "null";
      carDetails.brand = body.brand;
      carDetails.color = body.color;
      carDetails.fuel = body.fuel;
      carDetails.mileage = body.mileage;
      carDetails.user_id = body.user_id;
    }

    carDetails.save((err2, result) => {
      if (err2) {
        return res.status(500).json({ message: err2.message.split(":")[2] });
      }
      if (!result) {
        return res.status(404).json({ message: "No such Car!" });
      }
      res.status(200).json({ message: "Car Details Updated Successfully!!!" });
    });
  });
});

// To delete uploaded car image
router.delete("/file/:filename", (req, res) => {
  gfs.files.deleteOne({ filename: req.params.filename }, (err, result) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "File Not Found" });
    }
    return res.status(200).json({ message: "File Deleted Successfully!" });
  });
});

// To delete saved Car
router.delete("/:id", async (req, res) => {
  Car.findById(req.params.id, (err, car) => {
    if (err) {
      return res.status(500).json({ message: err });
    }
    if (!car) {
      return res.status(404).json({ message: "Car doesn't exist!" });
    }
    car.remove((err2, result) => {
      if (err2) {
        return res.status(500).json({ message: err2 });
      }
      if (!result) {
        return res.status(404).json({ message: "Error while deleting Car!" });
      }
    });
    res.status(200).json({ message: "Car Deleted Succesfully!!!" });
  });
});
module.exports = router;

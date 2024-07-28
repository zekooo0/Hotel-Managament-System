const express = require("express");
const router = express.Router();
const hotelController = require("../controllers/hotelController");

// Fetch all hotels
router.get("/get", hotelController.fetchHotels);

// Fetch single hotel
router.get("/get/:id", hotelController.fetchHotel);

// Add hotel with file upload middleware
router.post("/add", hotelController.upload, hotelController.addHotel);

// Update hotel with file upload middleware
router.put("/update/:id", hotelController.upload, hotelController.updateHotel);

// Delete hotel
router.delete("/delete/:id", hotelController.deleteHotel);

// Upload image
router.post("/uploadImage", hotelController.uploadImage);

module.exports = router;

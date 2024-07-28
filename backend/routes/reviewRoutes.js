const express = require("express");

const router = express.Router();
const { CreateReview, GetReviews } = require("../controllers/reviewController");

router.post("/", CreateReview);
router.get("/:id", GetReviews);

module.exports = router;

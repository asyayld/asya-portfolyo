const express = require("express");
const router = express.Router();

const {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
} = require("../controllers/profileController");

// GET /api/profiles
router.get("/", getProfile);

// POST /api/profiles
router.post("/", createProfile);

// PUT /api/profiles/:id
router.put("/:id", updateProfile);

// DELETE /api/profiles/:id
router.delete("/:id", deleteProfile);

module.exports = router;
const Profile = require("../models/Profile");

// GET - Profil getir
const getProfile = async (req, res) => {
  try {
    const profile = await Profile.findOne();
    res.json(profile);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// POST - Profil oluştur
const createProfile = async (req, res) => {
  try {
    const profile = await Profile.create(req.body);

    res.status(201).json(profile);
  } catch (err) {
    res.status(400).json({
      message: err.message,
    });
  }
};

// PUT - Profil güncelle
const updateProfile = async (req, res) => {
  try {
    const profile = await Profile.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    res.json(profile);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE - Profil sil
const deleteProfile = async (req, res) => {
  try {
    await Profile.findByIdAndDelete(req.params.id);

    res.json({
      message: "Profil silindi.",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getProfile,
  createProfile,
  updateProfile,
  deleteProfile,
};
const express = require('express');
const userProfileController = require('../controllers/userProfileController');
const router = express.Router();

// POST /profiles - Create a new profile
router.post('/profile', userProfileController.createProfile);

// Update user profile
router.put('/profile', userProfileController.updateProfile);

// Get user profile details
router.get('/profile', userProfileController.getProfileDetails);

// Update visibility status
router.put('/profile/visibility', userProfileController.updateVisibility);

// Get visibility status
router.get('/profile/visibility', userProfileController.getVisibilityStatus);

// Get profiles by criteria
router.get('/profiles', userProfileController.getProfiles);

// Get profile by ID
router.get('/profile/:id', userProfileController.getProfileById);

// Discard a profile
router.post('/profile/:id/discard', userProfileController.discardProfile);

module.exports = router;

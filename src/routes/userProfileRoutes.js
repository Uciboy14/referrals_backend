const express = require('express');
const userProfileController = require('../controllers/userProfileController');
const router = express.Router();

// POST profiles - Create a new profile
router.post('/', userProfileController.createProfile);

// Update user profile
router.put('/', userProfileController.updateProfile);

// Get user profile details
router.get('/', userProfileController.getProfileDetails);

// Update visibility status
router.put('/visibility', userProfileController.updateVisibility);

// Get visibility status
router.get('/visibility', userProfileController.getVisibilityStatus);

// Get profiles by criteria
router.get('/', userProfileController.getProfiles);

// Get profile by ID
router.get('/:id', userProfileController.getProfileById);

// Discard a profile
router.post('/:id/discard', userProfileController.discardProfile);

module.exports = router;

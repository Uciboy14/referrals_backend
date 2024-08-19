// controllers/userProfileController.js
const ReferralUserInfo = require('../models/ReferralUserInfo');
const ProfessionalExperience = require('../models/ProfessionalExperience');
const ActionUserProfile = require('../models/ActionUserProfile');

// Fetch profiles for user feed
exports.getProfilesForFeed = async (req, res) => {
  try {
    const uid = req.user.id;

    const actionProfiles = await ActionUserProfile.find({ by_uid: uid }).select('to_uid').lean();
    const excludedIds = actionProfiles.map(profile => profile.to_uid);

    const userProfiles = await ReferralUserInfo.find({ _id: { $nin: excludedIds } });
    res.json(userProfiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profiles for feed', error });
  }
};

// Fetch profiles by experience and field
exports.getProfilesByExperienceAndField = async (req, res) => {
  try {
    const { experienceFilter, fieldFilter } = req.query;

    const experienceProfiles = await ProfessionalExperience.find({
      years_of_exp: experienceFilter,
      field_of_study: fieldFilter
    }).select('uid').lean();

    const userIds = experienceProfiles.map(profile => profile.uid);
    const userProfiles = await ReferralUserInfo.find({ _id: { $in: userIds } });

    res.json(userProfiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profiles', error });
  }
};

// Handle user swipe
exports.handleSwipe = async (req, res) => {
  try {
    const { toUid, isInterested, isRejected } = req.body;
    const byUid = req.user.id;

    const action = await ActionUserProfile.findOneAndUpdate(
      { by_uid: byUid, to_uid: toUid },
      {
        is_interested: isInterested,
        is_rejected: isRejected,
        end_date: new Date(),
      },
      { upsert: true, new: true }
    );

    res.json(action);
  } catch (error) {
    res.status(500).json({ message: 'Error handling swipe', error });
  }
};

// Fetch interested profiles
exports.getInterestedProfiles = async (req, res) => {
  try {
    const uid = req.user.id;

    const interestedProfiles = await ActionUserProfile.find({
      by_uid: uid,
      is_interested: true
    }).select('to_uid').lean();

    const userIds = interestedProfiles.map(profile => profile.to_uid);
    const userProfiles = await ReferralUserInfo.find({ _id: { $in: userIds } });

    res.json(userProfiles);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching interested profiles', error });
  }
};

import { profileService } from '../services/profileService.js';
import { DEFAULT_DEMO_PROFILE } from '../database/defaultData.js';

export async function getProfile(req, res, next) {
  try {
    const userId = req.user.id;
    let profile = await profileService.getProfile(userId, req.user.token);

    if (!profile) {
      // In dev mode, return default demo profile if none exists
      profile = {
        ...DEFAULT_DEMO_PROFILE,
        id: userId
      };
    }

    return res.status(200).json({
      success: true,
      data: profile
    });
  } catch (err) {
    next(err);
  }
}

export async function saveProfile(req, res, next) {
  try {
    const userId = req.user.id;
    const profile = await profileService.upsertProfile(userId, req.body, req.user.token);

    return res.status(200).json({
      success: true,
      message: 'Student profile updated successfully',
      data: profile
    });
  } catch (err) {
    next(err);
  }
}

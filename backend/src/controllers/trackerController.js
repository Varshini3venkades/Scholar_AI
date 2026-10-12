import { trackerService } from '../services/trackerService.js';

export async function getStudentApplications(req, res, next) {
  try {
    const studentId = req.user.id;
    const applications = await trackerService.getStudentApplications(studentId, req.user.token);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Calculate days remaining for each application
    const enriched = applications.map(app => {
      let daysLeft = null;
      if (app.scholarship?.application_deadline) {
        const d = new Date(app.scholarship.application_deadline);
        d.setHours(0, 0, 0, 0);
        daysLeft = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      }

      return {
        ...app,
        daysLeft
      };
    });

    return res.status(200).json({
      success: true,
      count: enriched.length,
      data: enriched
    });
  } catch (err) {
    next(err);
  }
}

export async function saveApplication(req, res, next) {
  try {
    const studentId = req.user.id;
    const saved = await trackerService.upsertApplication(studentId, req.body, req.user.token);

    return res.status(200).json({
      success: true,
      message: 'Application tracked successfully',
      data: saved
    });
  } catch (err) {
    next(err);
  }
}

export async function deleteApplication(req, res, next) {
  try {
    const studentId = req.user.id;
    const { scholarshipId } = req.params;

    if (!scholarshipId) {
      return res.status(400).json({
        success: false,
        error: 'scholarshipId parameter is required'
      });
    }

    await trackerService.deleteApplication(studentId, scholarshipId, req.user.token);

    return res.status(200).json({
      success: true,
      message: 'Application removed from tracker'
    });
  } catch (err) {
    next(err);
  }
}

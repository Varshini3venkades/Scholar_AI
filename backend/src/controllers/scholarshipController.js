import { scholarshipService } from '../services/scholarshipService.js';

export async function getAllScholarships(req, res, next) {
  try {
    const {
      search = '',
      category = 'All',
      state = '',
      maxIncome,
      isGovernment,
      onlyActive = 'false',
      page = 1,
      limit = 10,
      sortBy = 'application_deadline',
      sortOrder = 'asc'
    } = req.query;

    const result = await scholarshipService.getScholarships({
      search,
      category,
      state,
      maxIncome,
      isGovernment,
      onlyActive: onlyActive === 'true',
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sortBy,
      sortOrder
    });

    return res.status(200).json({
      success: true,
      data: result.scholarships,
      pagination: result.pagination
    });
  } catch (err) {
    next(err);
  }
}

export async function getScholarshipById(req, res, next) {
  try {
    const { id } = req.params;
    const scholarship = await scholarshipService.getScholarshipById(id);

    if (!scholarship) {
      return res.status(404).json({
        success: false,
        error: `Scholarship with ID '${id}' not found`
      });
    }

    return res.status(200).json({
      success: true,
      data: scholarship
    });
  } catch (err) {
    next(err);
  }
}

import { body, query, validationResult } from 'express-validator';

export function handleValidationErrors(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      error: 'Input Validation Failed',
      details: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg,
        value: err.value
      }))
    });
  }
  next();
}

// Student Profile Validation Rules
export const validateProfileInput = [
  body('full_name')
    .optional()
    .isString().withMessage('Full name must be a string')
    .trim().isLength({ min: 2, max: 100 }).withMessage('Full name must be between 2 and 100 characters'),
  body('name')
    .optional()
    .isString().withMessage('Name must be a string')
    .trim().isLength({ min: 2, max: 100 }).withMessage('Name must be between 2 and 100 characters'),
  
  body('tenth_marks')
    .optional({ nullable: true })
    .isFloat({ min: 0, max: 100 }).withMessage('10th marks percentage must be between 0 and 100'),
  body('tenthMarks')
    .optional({ nullable: true })
    .isFloat({ min: 0, max: 100 }).withMessage('10th marks percentage must be between 0 and 100'),

  body('twelfth_marks')
    .optional({ nullable: true })
    .isFloat({ min: 0, max: 100 }).withMessage('12th marks percentage must be between 0 and 100'),
  body('twelfthMarks')
    .optional({ nullable: true })
    .isFloat({ min: 0, max: 100 }).withMessage('12th marks percentage must be between 0 and 100'),

  body('cgpa')
    .optional({ nullable: true })
    .isFloat({ min: 0, max: 10 }).withMessage('CGPA must be between 0.0 and 10.0'),

  body('degree')
    .optional()
    .isString().trim().notEmpty().withMessage('Degree is required'),

  body('study_year')
    .optional()
    .isString().trim().notEmpty().withMessage('Study year is required'),
  body('yearOfStudy')
    .optional()
    .isString().trim().notEmpty().withMessage('Year of study is required'),

  body('annual_income')
    .optional()
    .isFloat({ min: 0 }).withMessage('Annual family income must be a positive number'),
  body('annualIncome')
    .optional()
    .isFloat({ min: 0 }).withMessage('Annual family income must be a positive number'),

  body('state')
    .optional()
    .isString().trim().notEmpty().withMessage('State is required'),

  body('gender')
    .optional()
    .isIn(['Female', 'Male', 'Other', 'All']).withMessage('Gender must be Female, Male, Other, or All'),

  handleValidationErrors
];

// Application Tracker Validation Rules
export const validateApplicationInput = [
  body('scholarship_id')
    .optional()
    .isString().trim().notEmpty().withMessage('scholarship_id is required'),
  body('scholarshipId')
    .optional()
    .isString().trim().notEmpty().withMessage('scholarshipId is required'),

  body('status')
    .optional()
    .isIn(['not_started', 'docs_ready', 'submitted', 'under_review', 'awarded', 'rejected'])
    .withMessage('Status must be not_started, docs_ready, submitted, under_review, awarded, or rejected'),

  handleValidationErrors
];

// Financial Calculator Validation Rules
export const validateCalculatorInput = [
  body('tuition_fee').optional().isFloat({ min: 0 }).withMessage('Tuition fee must be >= 0'),
  body('tuitionFee').optional().isFloat({ min: 0 }).withMessage('Tuition fee must be >= 0'),
  body('living_expenses').optional().isFloat({ min: 0 }).withMessage('Living expenses must be >= 0'),
  body('livingExpenses').optional().isFloat({ min: 0 }).withMessage('Living expenses must be >= 0'),
  body('books_supplies').optional().isFloat({ min: 0 }).withMessage('Books & supplies must be >= 0'),
  body('booksSupplies').optional().isFloat({ min: 0 }).withMessage('Books & supplies must be >= 0'),
  body('family_contribution').optional().isFloat({ min: 0 }).withMessage('Family contribution must be >= 0'),
  body('familyContribution').optional().isFloat({ min: 0 }).withMessage('Family contribution must be >= 0'),
  body('existing_aid').optional().isFloat({ min: 0 }).withMessage('Existing aid must be >= 0'),
  body('existingAid').optional().isFloat({ min: 0 }).withMessage('Existing aid must be >= 0'),

  handleValidationErrors
];

// Scholarship Query Validation Rules
export const validateScholarshipQuery = [
  query('page').optional().isInt({ min: 1 }).withMessage('Page must be an integer >= 1'),
  query('limit').optional().isInt({ min: 1, max: 100 }).withMessage('Limit must be between 1 and 100'),
  query('maxIncome').optional().isFloat({ min: 0 }).withMessage('maxIncome must be a positive number'),
  handleValidationErrors
];

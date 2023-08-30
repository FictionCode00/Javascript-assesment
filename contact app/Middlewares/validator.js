const { body, validationResult } = require('express-validator');

const validateContactFields = [
    body('firstName').isAlpha().isLength({ min: 3 }).trim(),
    body('lastName').isAlpha().isLength({ min: 3 }).trim(),
    body('gender').isIn(['MALE', 'FEMALE', 'OTHERS']),
    body('address.line1').isLength({ min: 8 }).trim(),
    body('address.line2').optional().trim(),
    body('address.city').trim(),
    body('address.country').trim().isLength({ min: 1 }).toUpperCase(),
    body('address.zipCode').isLength({ max: 10 }).trim(),
    body('email').isEmail().normalizeEmail(),
    body('phone').isNumeric().isLength({ min: 10, max: 10 }),
];

const UpdateContactFields = [
    body('firstName').isAlpha().isLength({ min: 3 }).optional().trim(),
    body('lastName').isAlpha().isLength({ min: 3 }).optional().trim(),
    body('gender').optional().isIn(['MALE', 'FEMALE', 'OTHERS']),
    body('address.line1').isLength({ min: 8 }).optional().trim(),
    body('address.line2').optional().trim(),
    body('address.city').optional().trim(),
    body('address.country').optional().trim().isLength({ min: 1 }).toUpperCase(),
    body('address.zipCode').optional().isLength({ max: 10 }).trim(),
    body('email').optional().isEmail().normalizeEmail(),
    body('phone').optional().isNumeric().isLength({ min: 10, max: 10 }),
];
const validateContact = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array()});
    }
    next();
};


module.exports={validateContactFields,UpdateContactFields, validateContact}
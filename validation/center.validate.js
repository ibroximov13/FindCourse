const { body, query } = require("express-validator");

const createCenterValidation = [
  body("name").notEmpty().withMessage("Name is required"),
  body("regionId").notEmpty().withMessage("regionId is required").isInt(),
  body("address").notEmpty().withMessage("Address is required"),
  body("userId").notEmpty().withMessage("userId is required").isInt(),
  body("phone").notEmpty().withMessage("Phone is required"),
  body("location").notEmpty().withMessage("Location is required"),
];

const updateCenterValidation = [
  body("name").optional().notEmpty().withMessage("Name cannot be empty"),
  body("regionId").optional().isInt().withMessage("regionId must be integer"),
  body("address").optional().notEmpty().withMessage("Address cannot be empty"),
  body("userId").optional().isInt().withMessage("userId must be integer"),
  body("phone").optional().notEmpty().withMessage("Phone cannot be empty"),
  body("location").optional().notEmpty().withMessage("Location cannot be empty"),
  body("star").optional().isInt().withMessage("star must be integer"),
  body("filial").optional().isInt().withMessage("filial must be integer"),
];

const paginationAndFilterValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be a positive integer"),
  query("limit").optional().isInt({ min: 1 }).withMessage("Limit must be a positive integer"),
  query("name").optional().isString(),
  query("regionId").optional().isInt().withMessage("regionId must be integer"),
];

module.exports = {
  createCenterValidation,
  updateCenterValidation,
  paginationAndFilterValidation,
};
const {db} = require("../config/db");
require("./association.js");

const User = require("./user.model");
const Region = require("./region.model");
const Branch = require("./branch.model");
const Center = require("./center.model");
const Subject = require("./subject.model");
const Course = require("./course.model");
const Category = require("./category.model");
const Resource = require("./resource.model");
const Enrollment = require("./enrollment.model");
const Comment = require("./comment.model");
const Like = require("./like.model");
const FilSubItem = require("./branchSubItem.model");
const FilCourseItem = require("./branchCourseItem.model");
const SubjectItem = require("./subjectItem.model");
const CourseItem = require("./courseItem.model");

module.exports = {
    User,
    Region,
    Branch,
    Center,
    Subject,
    Course,
    Category,
    Resource,
    Enrollment,
    Comment,
    Like,
    FilSubItem,
    FilCourseItem,
    SubjectItem,
    CourseItem
  };
  
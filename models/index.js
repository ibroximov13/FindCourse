const {db} = require("../config/db");
const Enrollment = require("./enrollment.model");
require("./association.js");

const User = require("./user.model");
const Region = require("./region.model");
const Branch = require("./branch.model");
const Center = require("./center.model");
const Subject = require("./subject.model");
const Course = require("./course.model");
const Category = require("./category.model");
const Resource = require("./resource.model");
const Comment = require("./comment.model");
const Like = require("./like.model");
const BranchSubItem = require("./branchSubItem.model");
const BranchCourseItem = require("./branchCourseItem.model");
const SubjectItem = require("./subjectItem.model");
const CourseItem = require("./courseItem.model");
const Month = require("./month.model");
const Session = require("./session.model.js");

module.exports = {
    User,
    Region,
    Branch,
    Center,
    Subject,
    Course,
    Category,
    Month,
    Resource,
    Enrollment,
    Comment,
    Like,
    BranchSubItem,
    BranchCourseItem,
    SubjectItem,
    CourseItem,
    Session
  };
  
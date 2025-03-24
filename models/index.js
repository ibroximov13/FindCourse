const {db} = require("../config/db");
require("./associations");

const User = require("./user");
const Region = require("./region");
const Filial = require("./filial");
const Center = require("./center");
const Subject = require("./subject");
const Course = require("./course");
const Category = require("./category");
const Resource = require("./resource");
const Enrollment = require("./enrollment");
const Comment = require("./comment");
const Like = require("./like");
const FilSubItem = require("./filSubItem");
const FilCourseItem = require("./filCourseItem");
const SubjectItem = require("./subjectItem");
const CourseItem = require("./courseItem");

module.exports = {
    User,
    Region,
    Filial,
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
  
const User = require("./user.model");
const Region = require("./region.model");
const Center = require("./center.model");
const Branch = require("./branch.model");
const Subject = require("./subject.model");
const Course = require("./course.model");
const Category = require("./category.model");
const Resource = require("./resource.model");
const Like = require("./like.model");
const Comment = require("./comment.model");
const Enrollment = require("./enrollment.model");
const SubjectItem = require("./subjectItem.model");
const FilSubItem = require("./filSubItem.model");
const FilCourseItem = require("./filCourseItem.model");
const CourseItem = require("./courseItem.model");

Region.hasMany(User, { foreignKey: "region_id" });
User.belongsTo(Region, { foreignKey: "region_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Region.hasMany(Center, { foreignKey: "region_id" });
Center.belongsTo(Region, { foreignKey: "region_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Region.hasMany(Branch, { foreignKey: "region_id" });
Branch.belongsTo(Region, { foreignKey: "region_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Center.hasMany(Branch, { foreignKey: "center_id" });
Branch.belongsTo(Center, { foreignKey: "center_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Center.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasMany(Comment, { foreignKey: "user_id" });
Comment.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Center.hasMany(Comment, { foreignKey: "center_id" });
Comment.belongsTo(Center, { foreignKey: "center_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasMany(Like, { foreignKey: "user_id" });
Like.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Center.hasMany(Like, { foreignKey: "center_id" });
Like.belongsTo(Center, { foreignKey: "center_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasMany(Resource, { foreignKey: "user_id" });
Resource.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Category.hasMany(Resource, { foreignKey: "category_id" });
Resource.belongsTo(Category, { foreignKey: "category_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

User.hasMany(Enrollment, { foreignKey: "user_id" });
Enrollment.belongsTo(User, { foreignKey: "user_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Course.hasMany(Enrollment, { foreignKey: "course_id" });
Enrollment.belongsTo(Course, { foreignKey: "course_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Center.hasMany(Enrollment, { foreignKey: "center_id" });
Enrollment.belongsTo(Center, { foreignKey: "center_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Subject.hasMany(Enrollment, { foreignKey: "subject_id" });
Enrollment.belongsTo(Subject, { foreignKey: "subject_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Subject.hasMany(SubjectItem, { foreignKey: "subject_id" });
SubjectItem.belongsTo(Subject, { foreignKey: "subject_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Center.hasMany(SubjectItem, { foreignKey: "center_id" });
SubjectItem.belongsTo(Center, { foreignKey: "center_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Branch.hasMany(FilSubItem, { foreignKey: "branch_id" });
FilSubItem.belongsTo(Branch, { foreignKey: "branch_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Subject.hasMany(FilSubItem, { foreignKey: "subject_id" });
FilSubItem.belongsTo(Subject, { foreignKey: "subject_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Branch.hasMany(FilCourseItem, { foreignKey: "branch_id" });
FilCourseItem.belongsTo(Branch, { foreignKey: "branch_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Course.hasMany(FilCourseItem, { foreignKey: "course_id" });
FilCourseItem.belongsTo(Course, { foreignKey: "course_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Course.hasMany(CourseItem, { foreignKey: "course_id" });
CourseItem.belongsTo(Course, { foreignKey: "course_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

Center.hasMany(CourseItem, { foreignKey: "center_id" });
CourseItem.belongsTo(Center, { foreignKey: "center_id", onDelete: "CASCADE", onUpdate: "CASCADE" });

module.exports = {
    User,
    Region,
    Center,
    Branch,
    Subject,
    Course,
    Category,
    Resource,
    Like,
    Comment,
    Enrollment,
    SubjectItem,
    FilSubItem,
    FilCourseItem,
    CourseItem
};

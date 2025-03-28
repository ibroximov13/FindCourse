const User = require("./user.model");
const Region = require("./region.model");
const Center = require("./center.model");
const Subject = require("./subject.model");
const Course = require("./course.model");
const Category = require("./category.model");
const Resource = require("./resource.model");
const Enrollment = require("./enrollment.model");
const Comment = require("./comment.model");
const Like = require("./like.model");
const BranchSubItem = require("./branchSubItem.model");
const Branch = require("./branch.model");
const BranchCourseItem = require("./branchCourseItem.model");
const SubjectItem = require("./subjectItem.model");
const CourseItem = require("./courseItem.model");

User.hasMany(Resource, { foreignKey: "userId" });
Resource.belongsTo(User, { foreignKey: "userId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

Category.hasMany(Resource, { foreignKey: "categoryId" });
Resource.belongsTo(Category, { foreignKey: "categoryId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

User.hasMany(Like, { foreignKey: "userId" });
Like.belongsTo(User, { foreignKey: "userId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

Center.hasMany(Like, { foreignKey: "centerId" });
Like.belongsTo(Center, { foreignKey: "centerId", onDelete: 'CASCADE', onUpdate: "CASCADE" })

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

User.hasMany(Center, { foreignKey: "userId" });
Center.belongsTo(User, { foreignKey: "userId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

User.hasMany(Enrollment, { foreignKey: "userId" })
Enrollment.belongsTo(User, { foreignKey: "userId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

Region.hasMany(User, { foreignKey: "regionId" })
User.belongsTo(Region, { foreignKey: "regionId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

Region.hasMany(Center, { foreignKey: "regionId" });
Center.belongsTo(Region, { foreignKey: "regionId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

Center.hasMany(Enrollment, { foreignKey: "centerId" });
Enrollment.belongsTo(Center, { foreignKey: "centerId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

Center.hasMany(Comment, { foreignKey: "centerId" });
Comment.belongsTo(Center, { foreignKey: "centerId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

Center.hasMany(Branch, { foreignKey: "centerId" });
Branch.belongsTo(Center, { foreignKey: "centerId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

Region.hasMany(Branch, { foreignKey: "regionId" });
Branch.belongsTo(Region, { foreignKey: "regionId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

Branch.belongsToMany(Subject, { through: BranchSubItem, foreignKey: 'branchId', otherKey: 'subjectId', onDelete: 'CASCADE', onUpdate: "CASCADE" });
Subject.belongsToMany(Branch, { through: BranchSubItem, foreignKey: 'subjectId', otherKey: 'branchId', onDelete: 'CASCADE', onUpdate: "CASCADE" });

Branch.belongsToMany(Course, { through: BranchCourseItem, foreignKey: 'branchId', otherKey: 'courseId', onDelete: 'CASCADE', onUpdate: "CASCADE" });
Course.belongsToMany(Branch, { through: BranchCourseItem, foreignKey: 'courseId', otherKey: 'branchId', onDelete: 'CASCADE', onUpdate: "CASCADE" });

Center.belongsToMany(Subject, { through: SubjectItem, foreignKey: 'centerId', otherKey: 'subjectId', onDelete: 'CASCADE', onUpdate: "CASCADE" });
Subject.belongsToMany(Center, { through: SubjectItem, foreignKey: 'subjectId', otherKey: 'centerId', onDelete: 'CASCADE', onUpdate: "CASCADE" });

Center.belongsToMany(Course, { through: CourseItem, foreignKey: 'centerId', otherKey: 'courseId', onDelete: 'CASCADE', onUpdate: "CASCADE" });
Course.belongsToMany(Center, { through: CourseItem, foreignKey: 'courseId', otherKey: 'centerId', onDelete: 'CASCADE', onUpdate: "CASCADE" });

Subject.hasMany(Enrollment, { foreignKey: "subjectId" });
Enrollment.belongsTo(Subject, { foreignKey: "subjectId", onDelete: 'CASCADE', onUpdate: "CASCADE" });

Course.hasMany(Enrollment, { foreignKey: "courseId" });
Enrollment.belongsTo(Course, { foreignKey: "courseId", onDelete: 'CASCADE', onUpdate: "CASCADE" });





// User.belongsTo(Region, { foreignKey: "regionId" });
// Region.hasMany(User, { foreignKey: "regionId" });

// User.hasMany(Comment, { foreignKey: "userId" });
// Comment.belongsTo(User, { foreignKey: "userId" });

// User.hasMany(Like, { foreignKey: "userId" });
// Like.belongsTo(User, { foreignKey: "userId" });

// User.hasMany(Resource, { foreignKey: "userId" });
// Resource.belongsTo(User, { foreignKey: "userId" });

// Center.belongsTo(Region, { foreignKey: "regionId" });
// Region.hasMany(Center, { foreignKey: "regionId" });

// Center.belongsTo(Branch, { foreignKey: "BranchId" });
// Branch.hasMany(Center, { foreignKey: "branchId" });

// Center.belongsTo(User, { foreignKey: "userId" });
// User.hasMany(Center, { foreignKey: "userId" });

// Branch.belongsTo(Region, { foreignKey: "regionId" });
// Region.hasMany(Branch, { foreignKey: "regionId" });

// Course.belongsToMany(Subject, { through: SubjectItem });
// Subject.belongsToMany(Course, { through: SubjectItem });

// Center.belongsToMany(Course, { through: CourseItem });
// Course.belongsToMany(Center, { through: CourseItem });

// Branch.belongsToMany(Subject, { through: branchSubItem });
// Subject.belongsToMany(Branch, { through: branchSubItem });

// Branch.belongsToMany(Course, { through: branchCourseItem });
// Course.belongsToMany(Branch, { through: branchCourseItem });

// Enrollment.belongsTo(User, { foreignKey: "userId" });
// User.hasMany(Enrollment, { foreignKey: "userId" });

// Enrollment.belongsTo(Course, { foreignKey: "courseId" });
// Course.hasMany(Enrollment, { foreignKey: "courseId" });

// Enrollment.belongsTo(Subject, { foreignKey: "subjectId" });
// Subject.hasMany(Enrollment, { foreignKey: "subjectId" });

// Enrollment.belongsTo(Center, { foreignKey: "centerId" });
// Center.hasMany(Enrollment, { foreignKey: "centerId" });

// Comment.belongsTo(Center, { foreignKey: "centerId" });
// Center.hasMany(Comment, { foreignKey: "centerId" });

// Like.belongsTo(Center, { foreignKey: "centerId" });
// Center.hasMany(Like, { foreignKey: "centerId" });

// Resource.belongsTo(Category, { foreignKey: "categoryId" });
// Category.hasMany(Resource, { foreignKey: "categoryId" });

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
    BranchSubItem,
    BranchCourseItem,
    CourseItem
};

const User = require("./user.model");
const Region = require("./region.model");
const Filial = require("./branch.model");
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

User.hasMany(Resource, {foreignKey: "userId"});
Resource.belongsTo(User, {foreignKey: "userId", onDelete: 'CASCADE', onUpdate: "CASCADE"});

Category.hasMany(Resource, {foreignKey: "categoryId"});
Resource.belongsTo(Category, {foreignKey: "categoryId", onDelete: 'CASCADE', onUpdate: "CASCADE"});

User.hasMany(Like, {foreignKey: "userId"});
Like.belongsTo(User, {foreignKey: "userId", onDelete: 'CASCADE', onUpdate: "CASCADE"});

Center.hasMany(Like, {foreignKey: "centerId"});
Like.belongsTo(Center, {foreignKey: "centerId", onDelete: 'CASCADE', onUpdate: "CASCADE"})

User.hasMany(Comment, {foreignKey: "userId"});
Comment.belongsTo(User, {foreignKey: "userId", onDelete: 'CASCADE', onUpdate: "CASCADE"});

User.hasMany(Center, {foreignKey: "userId"});
Center.belongsTo(User, {foreignKey: "userId", onDelete: 'CASCADE', onUpdate: "CASCADE"});

User.hasMany(Enrollment, {foreignKey: "userId"})
Enrollment.belongsTo(User, {foreignKey: "userId", onDelete: 'CASCADE', onUpdate: "CASCADE"});

Region.hasMany(User, {foreignKey: "regionId"})
User.belongsTo(Region, {foreignKey: "regionId", onDelete: 'CASCADE', onUpdate: "CASCADE"});

Region.hasMany(Center, {foreignKey: "regionId"});
Center.belongsTo(Region, {foreignKey: "regionId", onDelete: 'CASCADE', onUpdate: "CASCADE"});

Center.hasMany(Enrollment, {foreignKey: "centerId"});
Enrollment.belongsTo(Center, {foreignKey: "centerId", onDelete: 'CASCADE', onUpdate: "CASCADE"});

Center.hasMany(Comment, {foreignKey: "centerId"});
Comment.belongsTo(Center, {foreignKey: "centerId", onDelete: 'CASCADE', onUpdate: "CASCADE"});

Center.hasMany(Filial, {foreignKey: "centerId"});
Filial.belongsTo(Center, {foreignKey: "centerId", onDelete: 'CASCADE', onUpdate: "CASCADE"});

Region.hasMany(Filial, {foreignKey: "regionId"});
Filial.belongsTo(Region, {foreignKey: "regionId", onDelete: 'CASCADE', onUpdate: "CASCADE"});

Filial.belongsToMany(Subject, { through: FilSubItem, foreignKey: 'filialId', otherKey: 'subjectId', onDelete: 'CASCADE', onUpdate: "CASCADE" });
Subject.belongsToMany(Filial, { through: FilSubItem, foreignKey: 'subjectId', otherKey: 'filialId', onDelete: 'CASCADE', onUpdate: "CASCADE" });

Filial.belongsToMany(Course, { through: FilCourseItem, foreignKey: 'filialId', otherKey: 'courseId', onDelete: 'CASCADE', onUpdate: "CASCADE" });
Course.belongsToMany(Filial, { through: FilCourseItem, foreignKey: 'courseId', otherKey: 'filialId', onDelete: 'CASCADE', onUpdate: "CASCADE" });

Center.belongsToMany(Subject, { through: SubjectItem, foreignKey: 'centerId', otherKey: 'subjectId', onDelete: 'CASCADE', onUpdate: "CASCADE" });
Subject.belongsToMany(Center, { through: SubjectItem, foreignKey: 'subjectId', otherKey: 'centerId', onDelete: 'CASCADE', onUpdate: "CASCADE" });

Center.belongsToMany(Course, { through: CourseItem, foreignKey: 'centerId', otherKey: 'courseId', onDelete: 'CASCADE', onUpdate: "CASCADE" });
Course.belongsToMany(Center, { through: CourseItem, foreignKey: 'courseId', otherKey: 'centerId', onDelete: 'CASCADE', onUpdate: "CASCADE" });

Subject.hasMany(Enrollment, {foreignKey: "subjectId"});
Enrollment.belongsTo(Subject, {foreignKey: "subjectId", onDelete: 'CASCADE', onUpdate: "CASCADE"});




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

// Center.belongsTo(Filial, { foreignKey: "FilialId" });
// Filial.hasMany(Center, { foreignKey: "filialId" });

// Center.belongsTo(User, { foreignKey: "userId" });
// User.hasMany(Center, { foreignKey: "userId" });

// Filial.belongsTo(Region, { foreignKey: "regionId" });
// Region.hasMany(Filial, { foreignKey: "regionId" });

// Course.belongsToMany(Subject, { through: SubjectItem });
// Subject.belongsToMany(Course, { through: SubjectItem });

// Center.belongsToMany(Course, { through: CourseItem });
// Course.belongsToMany(Center, { through: CourseItem });

// Filial.belongsToMany(Subject, { through: FilSubItem });
// Subject.belongsToMany(Filial, { through: FilSubItem });

// Filial.belongsToMany(Course, { through: FilCourseItem });
// Course.belongsToMany(Filial, { through: FilCourseItem });

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
    Filial,
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

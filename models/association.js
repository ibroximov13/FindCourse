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

User.belongsTo(Region, { foreignKey: "regionId" });
Region.hasMany(User, { foreignKey: "regionId" });

User.hasMany(Comment, { foreignKey: "userId" });
Comment.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Like, { foreignKey: "userId" });
Like.belongsTo(User, { foreignKey: "userId" });

User.hasMany(Resource, { foreignKey: "userId" });
Resource.belongsTo(User, { foreignKey: "userId" });

Center.belongsTo(Region, { foreignKey: "regionId" });
Region.hasMany(Center, { foreignKey: "regionId" });

Center.belongsTo(Filial, { foreignKey: "filialId" });
Filial.hasMany(Center, { foreignKey: "filialId" });

Center.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Center, { foreignKey: "userId" });

Filial.belongsTo(Region, { foreignKey: "regionId" });
Region.hasMany(Filial, { foreignKey: "regionId" });

Course.belongsToMany(Subject, { through: SubjectItem });
Subject.belongsToMany(Course, { through: SubjectItem });

Center.belongsToMany(Course, { through: CourseItem });
Course.belongsToMany(Center, { through: CourseItem });

Filial.belongsToMany(Subject, { through: FilSubItem });
Subject.belongsToMany(Filial, { through: FilSubItem });

Filial.belongsToMany(Course, { through: FilCourseItem });
Course.belongsToMany(Filial, { through: FilCourseItem });

Enrollment.belongsTo(User, { foreignKey: "userId" });
User.hasMany(Enrollment, { foreignKey: "userId" });

Enrollment.belongsTo(Course, { foreignKey: "courseId" });
Course.hasMany(Enrollment, { foreignKey: "courseId" });

Enrollment.belongsTo(Subject, { foreignKey: "subjectId" });
Subject.hasMany(Enrollment, { foreignKey: "subjectId" });

Enrollment.belongsTo(Center, { foreignKey: "centerId" });
Center.hasMany(Enrollment, { foreignKey: "centerId" });

Comment.belongsTo(Center, { foreignKey: "centerId" });
Center.hasMany(Comment, { foreignKey: "centerId" });

Like.belongsTo(Center, { foreignKey: "centerId" });
Center.hasMany(Like, { foreignKey: "centerId" });

Resource.belongsTo(Category, { foreignKey: "categoryId" });
Category.hasMany(Resource, { foreignKey: "categoryId" });

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

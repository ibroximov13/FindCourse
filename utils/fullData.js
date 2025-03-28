const bcrypt = require("bcrypt");
const { db } = require("../config/db");
const { User, Region, Category, Subject, Course, Month } = require("../models");

async function fullData() {
  try {
    await User.destroy({ where: {} });
    await Region.destroy({ where: {} });
    await Category.destroy({ where: {} });
    await Subject.destroy({ where: {} });
    await Course.destroy({ where: {} });
    await Month.destroy({ where: {} }); 

    await db.query("ALTER TABLE regions AUTO_INCREMENT = 1");
    await db.query("ALTER TABLE categories AUTO_INCREMENT = 1");
    await db.query("ALTER TABLE subjects AUTO_INCREMENT = 1");
    await db.query("ALTER TABLE courses AUTO_INCREMENT = 1");
    await db.query("ALTER TABLE months AUTO_INCREMENT = 1"); 
    await db.query("ALTER TABLE users AUTO_INCREMENT = 1");

    const regionNames = [
      "Toshkent",
      "Andijon",
      "Buxoro",
      "Farg'ona",
      "Jizzax",
      "Xorazm",
      "Namangan",
      "Navoiy",
      "Qashqadaryo",
      "Qoraqalpog'iston",
      "Samarqand",
      "Sirdaryo",
      "Surxondaryo",
    ];

    for (let i = 0; i < regionNames.length; i++) {
      await Region.create({ name: regionNames[i] });
    }
    console.log("Regions created");

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    for (let i = 0; i < monthNames.length; i++) {
      await Month.create({ name: monthNames[i] });
    }
    console.log("Months created");

    const categoryData = [
      { name: "Science", image: "http://example.com/images/science.jpg" },
      { name: "Mathematics", image: "http://example.com/images/mathematics.jpg" },
      { name: "Languages", image: "http://example.com/images/languages.jpg" },
      { name: "Technology", image: "http://example.com/images/technology.jpg" },
      { name: "Arts", image: "http://example.com/images/arts.jpg" },
    ];

    for (let i = 0; i < categoryData.length; i++) {
      await Category.create(categoryData[i]);
    }
    console.log("Categories created");

    const subjectData = [
      { name: "Physics", image: "http://example.com/images/physics.jpg" },
      { name: "Algebra", image: "http://example.com/images/algebra.jpg" },
      { name: "English", image: "http://example.com/images/english.jpg" },
      { name: "Programming", image: "http://example.com/images/programming.jpg" },
      { name: "Painting", image: "http://example.com/images/painting.jpg" },
    ];

    for (let i = 0; i < subjectData.length; i++) {
      await Subject.create(subjectData[i]);
    }
    console.log("Subjects created");

    const courseData = [
      { name: "Introduction to Physics", categoryId: 1 },
      { name: "Advanced Algebra", categoryId: 2 },
      { name: "English Grammar", categoryId: 3 },
      { name: "Web Development", categoryId: 4 },
      { name: "Art Basics", categoryId: 5 },
    ];

    for (let i = 0; i < courseData.length; i++) {
      await Course.create(courseData[i]);
    }
    console.log("Courses created");

    const adminExists = await User.findOne({ where: { role: "ADMIN" } });
    if (!adminExists) {
      const region = await Region.findOne({ where: { name: "Toshkent" } });
      await User.create({
        fullName: "Admin User",
        year: "2000",
        phone: "+998901234567",
        email: "admin@example.com",
        password: bcrypt.hashSync("admin123", 10),
        role: "ADMIN",
        regionId: region.id,
      });
      console.log("Admin created!");
    } else {
      console.log("Admin already exists!");
    }
  } catch (error) {
    console.error("Error creating data:", error);
  }
}

module.exports = { fullData };
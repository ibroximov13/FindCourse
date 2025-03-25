const User = require("../models/user.model");
const Region = require("../models/region.model");
const bcrypt = require("bcrypt");
const { db } = require("../config/db");

async function initData() {
    try {
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
            "Surxondaryo"
        ];
        await User.destroy({ where: {} });
        await Region.destroy({ where: {} });
        await db.query("ALTER TABLE regions AUTO_INCREMENT = 1");

        for (let i = 0; i < regionNames.length; i++) {
            await Region.create({ name: regionNames [i] });
        }
        console.log("All regions created");

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
                region_id: region.id
            });
            console.log("Admin created!");
        } else {
            console.log("Admin already exists!");
        }
    } catch (error) {
        console.error("Error creating data:", error);
    }
}

module.exports = { initData };
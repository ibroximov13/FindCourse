const ExcelJS = require("exceljs");

async function generateUsersExcel(users) {
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Users");

    worksheet.columns = [
        { header: "ID", key: "id", width: 10 },
        { header: "Full Name", key: "fullName", width: 25 },
        { header: "Email", key: "email", width: 30 },
        { header: "Phone", key: "phone", width: 20 },
        { header: "Role", key: "role", width: 15 },
        { header: "Region ID", key: "region_id", width: 15 },
    ];

    users.forEach(user => {
        worksheet.addRow(user.dataValues);
    });

    return workbook;
}

module.exports = { generateUsersExcel };

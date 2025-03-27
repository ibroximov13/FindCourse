const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, "../uploads/uploadResource");

fs.promises.mkdir(uploadDir, { recursive: true }).then(() => {
    console.log("✅ uploadCategory papkasi tayyor.");
}).catch(err => {
    console.error("❌ Papka yaratishda xatolik:", err);
});

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
        const safeFilename = path.basename(file.originalname);
        cb(null, uniqueSuffix + path.extname(safeFilename));
    },
});

const upload = multer({ storage });

module.exports = upload;

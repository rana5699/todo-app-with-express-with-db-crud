const multer = require("multer");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, file.fieldname + "-" + name);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

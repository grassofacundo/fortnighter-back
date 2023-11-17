const cors = require("cors");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");

const corsOptions = {
    allowedHeaders: ["Content-Type", "Authorization"],
};
exports.corsConfig = cors(corsOptions);

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "images");
    },
    filename: function (req, file, cb) {
        cb(null, uuidv4());
    },
});
const fileFilter = (req, file, cb) => {
    const type = file.mimetype;
    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg")
        cb(null, true);
    cb(null, false);
};

exports.multerConfig = multer({ storage, fileFilter }).single("image");

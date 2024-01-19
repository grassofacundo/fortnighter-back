import cors from "cors";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";

const corsOptions = {
    origin: ["http://localhost:5173"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
};
export const corsConfig = cors(corsOptions);

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

export const multerConfig = multer({ storage, fileFilter }).single("image");

const { create, getUser, update } = require("../controllers/user");
const multer = require("multer");
const path = require("path");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      return cb("Error: Images Only!");
    }
  },
}); // atur lokasi penyimpanan sementara file
const routes = require("express").Router();
routes.post("/create", upload.single("image"), create);
routes.get("/detail/:id", getUser);
routes.put("/edit/:id", upload.single("image"), update);
module.exports = routes;

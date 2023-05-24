const multer = require("multer");
const path = require('path');
const fs = require('fs');
var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/resources/static/assets/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null,`${Date.now()}_ace_${file.originalname}`);
  },
});
var uploadFile = multer({ storage: storage});
module.exports = uploadFile;

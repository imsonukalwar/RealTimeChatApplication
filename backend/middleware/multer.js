// const multer=require('multer')

// const storage=multer.diskStorage({
//     destination:(req,file,cb)=>{
//         cb(null,"./public")
//     },
//     destination:(req,file,cb)=>{
//         cb(null,file.originalname)
//     }
// })

// const upload=multer({storage})

// module.exports=upload



const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure public folder exists
if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public");
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public"); // ✅ folder
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9) +
      path.extname(file.originalname);

    cb(null, uniqueName); // ✅ file name
  },
});

const upload = multer({ storage });

module.exports = upload;

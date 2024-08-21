// const multer  = require('multer:./../multer');
// const path = require('path');

// const tempDir = path.join(__dirname, '../', 'temp');

// const multerConfig = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, tempDir)
//     },
//     filename: (req, file, cb) => {
//         cb(null, file.originalName)
//     },
//     limits: {
//     fileSize: 1048576
// }
// })


// const upload = multer({
//     storage: multerConfig
// })

// console.log(tempDir)

// module.exports = upload;

const multer = require("multer");
const path = require("path");

const tempDir = path.join(__dirname, "../", "temp");

const multerConfig = multer.diskStorage({
    destination: tempDir,
    filename: (req, file, cb) =>{
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: multerConfig
})

module.exports = upload;
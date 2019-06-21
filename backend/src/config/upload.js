/**
 * Lib multer is used to handle multipart/form-data, storing files to the
 * diskStorage in folder uploads with its original name from user machine.
 */
const multer = require('multer');
const path = require('path');

module.exports = {
  storage: new multer.diskStorage({
    destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(req, file, cb) {
      cb(null, file.originalname);
    },
  }),
};

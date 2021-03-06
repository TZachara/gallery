const multer = require('multer');
const { storage } = require('../database/gridfs');

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
            return cb(null, true);
        }
        return cb(null, false);
    },
});

module.exports = upload;

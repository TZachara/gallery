const mongoose = require('mongoose');
const GridFsStorage = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const config = require('../config');

let gfs, gridFSBucket;

const conn = mongoose.createConnection(config.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
});

// const gridFsConnection = (conn) => {
conn.once('open', () => {
    // Initalize Grid Bucket
    gridFSBucket = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
});

const getFileById = (id) => {
    return new Promise((resolve, reject) => {
        gridFSBucket.find({ _id: mongoose.Types.ObjectId(id) }).toArray((err, files) => {
            if (err) reject(err);
            // Check if files
            if (!files[0] || files.length === 0) {
                resolve(null);
            } else {
                resolve(files[0]);
            }
        });
    });
};

const deleteFileById = (id) => {
    return new Promise((resolve, reject) => {
        gridFSBucket.delete({ _id: mongoose.Types.ObjectId(id), root: 'uploads' }, (err, files) => {
            if (err) reject(err);
        });
        resolve(true);
    });
};

const createGridFSReadStream = (id) => {
    return gridFSBucket.openDownloadStream(mongoose.Types.ObjectId(id));
};

const storage = new GridFsStorage({
    // url: config.mongoURI,
    // options: { useUnifiedTopology: true },
    db: conn,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            });
        });
    },
});
// };

module.exports.getFileById = getFileById;
module.exports.deleteFileById = deleteFileById;
module.exports.createGridFSReadStream = createGridFSReadStream;
module.exports.storage = storage;

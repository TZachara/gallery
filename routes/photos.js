const express = require('express');
const upload = require('../middleware/gridfs');
const Photo = require('../models/Photo');
const Album = require('../models/Album');
const { getFileById, createGridFSReadStream, deleteFileById, deleteAllFiles } = require('../database/gridfs');
const router = express.Router();

/** @route  GET /
 *  @desc   Get all images
 *  @access Public
 */
router.get('/', async (req, res) => {
    try {
        const photos = await Photo.find();
        if (!photos || photos.length === 0) {
            return res.status(400).json({ msg: 'There are not photos' });
        }
        return res.json(photos);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

/** @route  GET /:photo_id
 *  @desc   Get single image
 *  @access Public
 */
router.get('/:photo_id', async (req, res) => {
    try {
        const photo = await Photo.findOne({ id: req.params.photo_id });
        if (!photo) {
            return res.status(400).json({ msg: 'There is not photo with this id' });
        }
        return res.json(photo);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

/** @route  POST /
 *  @desc   Upload image
 *  @access Public
 */
router.post('/', [upload.single('file')], async (req, res) => {
    if (!req.file) {
        return res.json({ msg: 'Please upload a photo with .jpg or .png extension' });
    }
    const newPhoto = new Photo({
        fileId: req.file.id,
    });
    await newPhoto.save();
    return res.json(newPhoto);
});

/** @route  GET /link/:photo_id
 *  @desc   Get image as a file
 *  @access Public
 */
router.get('/link/:photo_id', async (req, res) => {
    try {
        const photo = await Photo.findOne({ _id: req.params.photo_id });

        if (!photo) {
            return res.status(400).json({ msg: 'There is not photo with this id' });
        }
        const image = await getFileById(photo.fileId);
        console.log(image.contentType);
        if (image.contentType === 'image/jpeg' || image.contentType === 'image/png') {
            res.setHeader('content-type', image.contentType);
            return createGridFSReadStream(image._id).pipe(res);
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

/** @route  DELETE /
 *  @desc   delete image by id
 *  @access Public
 */

router.delete('/:photo_id', async (req, res) => {
    try {
        const photo = await Photo.findOne({ _id: req.params.photo_id });
        if (!photo) {
            return res.status(400).json({ msg: 'There is not photo with this id' });
        }
        // TODO: Refactor this - query to gather albums to update
        const albums = await Album.find();
        albums.forEach(async (album) => {
            album.photos = album.photos.filter((photoInAlbum) => {
                return String(photoInAlbum._id) !== String(photo._id);
            });
            await album.save();
        });
        await deleteFileById(photo.fileId);
        await photo.deleteOne({ _id: req.params.photo_id });
        return res.json({ msg: 'Photo Removed' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

module.exports = router;

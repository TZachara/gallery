const express = require('express');
const Album = require('../models/Album');
const Photos = require('../models/Photo');
const router = express.Router();

/** @route  GET /
 *  @desc   Get all albums
 *  @access Public
 */
router.get('/', async (req, res) => {
    try {
        const album = await Album.find().populate('photo', ['_id']);
        if (!album || album.length === 0) {
            return res.status(400).json({ msg: 'There are no albums' });
        }
        res.json(album);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/** @route  GET /:album_id
 *  @desc   Get single album
 *  @access Public
 */
router.get('/:album_id', async (req, res) => {
    try {
        const album = await Album.findOne({ id: req.params.album_id });
        if (!album) {
            return res.status(400).json({ msg: 'There is not album with this id' });
        }
        return res.json(album);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

/** @route  POST /
 *  @desc   Create album
 *  @access Public
 */
router.post('/', async (req, res) => {
    // TODO: Check if album name exists
    const newAlbum = new Album({
        name: req.body.name,
    });
    await newAlbum.save();
    res.json(newAlbum);
});

/** @route  PUT /:album_id
 *  @desc   Update album
 *  @access Public
 */

router.put('/:album_id', async (req, res) => {
    const album = await Album.findOne({ _id: req.params.album_id });
    if (req.body.name) {
        album.name = req.body.name;
    }
    return res.json(album);
});

/** @route  PUT /:album_id/photo
 *  @desc   Add photo to album
 *  @access Public
 */
router.put('/:album_id/photo', async (req, res) => {
    try {
        const album = await Album.findOne({ _id: req.params.album_id });
        if (!album) {
            return res.status(400).json({ msg: 'There is no album with this ID' });
        }
        const photo = await Photo.findOne({ _id: req.body.photo });
        if (!photo) {
            return res.status(400).json({ msg: 'There is no photo with this ID' });
        }
        let isInAlbum = false;
        album.photos.forEach((photoInAlbum) => {
            if (String(photoInAlbum._id) === String(photo._id)) {
                isInAlbum = true;
            }
        });
        if (isInAlbum) {
            return res.status(400).json({ msg: 'Photo already in album' });
        }
        {
            album.photos.push(photo._id);
        }
        await album.save();
        return res.json(album);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

/** @route  DELETE /:album_id/photo
 *  @desc   Remove photo from album
 *  @access Public
 */
router.delete('/:album_id/photo', async (req, res) => {
    try {
        const album = await Album.findOne({ _id: req.params.album_id }).populate('photo');
        if (!album) {
            return res.status(400).json({ msg: 'There is no album with this ID' });
        }
        const photo = await Photo.findOne({ _id: req.body.photo });
        if (!photo) {
            return res.status(400).json({ msg: 'There is no photo with this ID' });
        }
        album.photos = album.photos.filter((photoInAlbum) => {
            return String(photoInAlbum._id) !== String(photo._id);
        });
        await album.save();
        return res.json(album);
    } catch (err) {
        console.error(err.message);
        return res.status(500).send('Server Error');
    }
});

/** @route  DELETE /:album_id
 *  @desc   Delete album
 *  @access Public
 */

router.delete('/:album_id', async (req, res) => {
    try {
        const album = await Album.findOne({ _id: req.params.album_id });
        if (!album || album.length === 0) {
            return res.status(400).json({ msg: 'There are no albums' });
        }
        console.log(album);
        await album.deleteOne({ _id: req.params.album_id });
        res.json({ msg: 'Album deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;


const express = require('express')
const searchPhoto = require('../utils/custom-search')

const Image = require('../models/imageModel');

const router = new express.Router()

const token = process.env.FLICKR_KEY;
const searchPhotoURL = `http://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=${token}&extras=url_m&format=json&nojsoncallback=1&text=`
const interestingPhotoURL =`http://www.flickr.com/services/rest/?method=flickr.interestingness.getList&api_key=${token}&extras=url_m&format=json&nojsoncallback=1`

router.get('/interesting-photos', async (req,res) => {
    try{
        const photosURL = await searchPhoto(interestingPhotoURL)
        res.send(photosURL)
    }
    catch (err) {
        res.status(500).send()
    }
})

router.get('/search-photos/:topic', async (req,res) => {
    const searchValue = req.params.topic
    try{
        const photosURL = await searchPhoto(searchPhotoURL + searchValue)
        res.send(photosURL)
    }
    catch (err) {
        if(err.status === 404) {
            res.status(404).send(err)
        }
        res.status(500).send()
    }
})

router.get('/show-imgs', async (req, res) => {
    try {
        const imgList = await Image.find({})
        if (imgList.length > 0) {
            let imgSrc = imgList.map((img) => img.src)
            res.send(imgSrc)
        } else {
            res.status(404).send()
        }
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
});

router.post('/upload-img', async (req, res) => {
    const src = req.query.src;
    const alt = req.query.alt || "unknown"    // if no alternative send will place "unknown"

    try{
        if(src){
            const img = new Image({
                src,
                alt
            })
            await img.save()
            res.send(img)
        } else {
            res.status(400).send()
            message: 'lack of src'
            
        }
    }catch(err){
        res.status(500).send
    }
});

module.exports = router
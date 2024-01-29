const express = require('express')
const router = express.Router()
const fs = require('fs')

router.get('/:imageName', (req, res) => {
    // do a bunch of if statements to make sure the user is 
    // authorized to view this image, then

    try {
        const imageName = req.params.imageName

        if (imageName) {
            const readStream = fs.createReadStream(`uploads/profiles/${imageName}`)
            readStream.pipe(res)

        }


    } catch (e) {
        console.log(e);
    }

})


module.exports = router
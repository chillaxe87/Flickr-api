const axios = require('axios')

const searchPhoto = async (url) => {
    try {
        console.log(url)
        const result = await axios.get(url)
        if(result.data.photos.photo.length > 0){
            let photos = []
            for(let photo of result.data.photos.photo){
                photos.push(photo.url_m)
            }
            return photos
        } else {
            throw {
                status: 404,
                message: "not found"
            }
        }
    } catch (err) {
        throw err
    }
}

// searchPhoto('https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=b4a5597ef76eea79296a1da39329479c&text=tree&extras=url_m&format=json&nojsoncallback=1')
// .then((res) => {
//     console.log(res)
// }).catch((err) => {
//     console.log(err)
// })
module.exports = searchPhoto
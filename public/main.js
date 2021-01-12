const divPhotos = document.getElementById("image-container")
const formSearch = document.getElementById("form-search")
const inputSearch = formSearch.children[0]

const imgUpload = document.getElementById("post-img")
const imgUploadURL = imgUpload.children[0]
const imgUploadAlt = imgUpload.children[1]
const showAllImage = document.getElementById("show-all-img")

const interestingPhotoURL = "http://localhost:3000/interesting-photos";
const searchPhotoURL = "http://localhost:3000/search-photos/";
const postPhotoURL = "http://localhost:3000/upload-img/";
const showAllPhotoURL = "http://localhost:3000/show-imgs/";


const renderImage = (url) => {
    while(divPhotos.children.length > 0){
        divPhotos.removeChild(divPhotos.lastChild)
    }
    fetch(url)
        .then((res) => {
            if(res.ok) {
                return res.json()
            } else {
                throw new Error(res.status);                
            }
        })
        .then((jsonObj) => {
            for (let imgURL of jsonObj){
                const img = document.createElement('img')
                img.src = imgURL
                divPhotos.appendChild(img)
            }
        })
        .catch((err) =>{
            console.log(err)
        })
}

renderImage(interestingPhotoURL);

formSearch.addEventListener('submit', (event) => {
    event.preventDefault()
    const searchValue = inputSearch.value
    const url = searchValue.length > 0 ? searchPhotoURL + searchValue : interestingPhotoURL
    renderImage(url)
})

imgUpload.addEventListener('submit', (event) => {
    event.preventDefault()
    const imgURL = postPhotoURL + `?src=${imgUploadURL.value}&alt=${imgUploadAlt.value}`

    fetch(imgURL, {
        method: 'POST'
    })
    .then((res) => {
        if(res.ok){
            return res.json()
        } else {
            throw new Error(res.status)
        }
    })
    .then((jsonObj) => {
        console.log(jsonObj)
        alert('Image submitted')
    })
    .catch((err) => {
        console.log(err)
    })
})

showAllImage.addEventListener('click', () => {
    renderImage(showAllPhotoURL)
})
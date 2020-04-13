var db = firebase.firestore();
var storage = firebase.storage();
console.log("storage --> ", storage)
checkUser()
getAllPost()

function checkUser() {
    var userDate = localStorage.getItem("userObj")
    console.log("userData ---> ", userDate)
    var user = JSON.parse(userDate)
    console.log("user ---> ", user);

    if (user) {
        //Remove login button
        document.getElementById("loginBtn").style.display = "none"
        document.getElementById("logoutBtn").style.display = "block"
    }
    else {
        document.getElementById('loginBtn').style.display = "block"
        document.getElementById('logoutBtn').style.display = "none"
    }
}

function logOut() {
    localStorage.removeItem("userObj")
    checkUser()
}

function addPost() {
    var userData = localStorage.getItem('userObj')
    var user = JSON.parse(userData)
    var category = document.getElementById('category').value
    // var location = document.getElementById('location').value
    // var brand = document.getElementById('brand').value
    // var contact = document.getElementById('contact').value
    var description = document.getElementById('description').value
    var price = document.getElementById('price').value
    var fileElement = document.getElementById('file')
    console.log(fileElement.files[0]);
    var file = fileElement.files[0]
    var fileType = file.type.split('/')[1] // png or jpg
    var fileName = user.id + '_' + Date.now() // for file unique name
    fileName = fileName + "." + fileType

    console.log("file ---> ", file);
    console.log("fileName ---> ", fileName);


    var storageRef = storage.ref("ads/" + fileName);
    storageRef.put(file).then(function(response){
        console.log("response --> ", response);

        storageRef.getDownloadURL().then(function(url) {
            console.log("URL ---> ", url);

            db.collection('post').add({
                category,
                // location,
                // brand,
                // contact,
                description,
                price,
                createdAt: Date.now(),
                userId: user.id,
                imageUrl: url
            }).then(function () {
                Swal.fire('Ad posted successfully')
                getAllPost()

                setTimeout(function() {
                    window.location.href = "../../index.html"
                    },2000)
                    
            }).catch(function (error) {
                Swal.fire({
                    icon: 'error',
                    // title: 'Abe teri...',
                    text: error.message
                })
            })
        })
    }).catch(function (error) {
        console.log(error.message);
    })

    /*Note:-
        Firebase me data add karne ke 2 tariqay:
    
        1) db.collection().doc().set() //doc me id dena zarori hai
        2) db.collection().add() //id khud generate karega
    */

    
}

function getAllPost() {
    var postsDiv = document.getElementById("get-data")
    postsDiv.innerHTML = ""
    console.log("postsDiv --> ", postsDiv),

    db.collection("post").get()
    .then(function(posts) {
        console.log("posts ---> ", posts);

        posts.forEach(function(post) {
            console.log("post ---> ", post)
            var postObj = post.data()
            postObj.id = post.id

            // var postDiv = document.createElement('div')
            var postImg = document.createElement('img')
            var category = document.createElement('h3')
            // var location = document.createElement('p')
            // var brand = document.createElement('h4')
            // var contact = document.createElement('p')
            var description = document.createElement('p')
            var price = document.createElement('h5')
            var dateElem = document.createElement('span')

            postImg.setAttribute("src", postObj.imageUrl)
            // postImg.style.width = "150px"
            // postImg.style.height = "150px"
            category.innerText = postObj.category
            // location.innerText = postObj.location
            // brand.innerText = postObj.brand
            // contact.innerText = postObj.contact
            description.innerText = postObj.description
            price.innerText = "RS "+postObj.price
            dateElem.innerText = new Date(postObj.createdAt)
            
            // postDiv.appendChild(postImg)
            var titleDiv = document.createElement('DIV')
            titleDiv.setAttribute('class','titleFlexBox')

            // titleDiv.appendChild(category)
            // titleDiv.appendChild(location)
            // titleDiv.appendChild(brand)
            // titleDiv.appendChild(contact)
            titleDiv.appendChild(description)
            titleDiv.appendChild(price)
            titleDiv.appendChild(dateElem)

            // titleDiv.style.border = "1px solid black"
            var imgDiv = document.createElement("DIV")
            imgDiv.setAttribute('class', 'img-box')
            imgDiv.appendChild(postImg)
            
            var nDiv = document.createElement("DIV");
            nDiv.appendChild(imgDiv)
            nDiv.appendChild(titleDiv)
            postsDiv.appendChild(nDiv)
            // postDiv.appendChild(dateElem)
        })
    })
}
function log() {
    window.location.href = "screens/login/login.html"
}
function sell() {
    window.location.href = "screens/adsForm/ads.html"
}
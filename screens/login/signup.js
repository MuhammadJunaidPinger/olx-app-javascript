var auth = firebase.auth()
var db = firebase.firestore()

function sign_up() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var reType = document.getElementById('reType').value
    console.log("Email --> " + email);
    console.log("Password --> " + password);
    console.log("Retype --> " + reType);

    auth.createUserWithEmailAndPassword(email, password)
    .then(function (response)
     {
         var uid = response.user.uid

         db.collection('users').doc(uid).set({
             email
         }).then(function(){
            Swal.fire(
                'Registration Successful'
              )
              setTimeout(function() {
              window.location.href = "login.html"
              },2000)
         })
        
    })
    .catch(function (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'The email address is already in use by another account.',
          })
    })
}
function checkPassword() {
    var password = document.getElementById('password').value
    var reType = document.getElementById('reType').value

    if(password === reType) {
        sign_up()
    }else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Password Not Matched... try again',

            
          })
    }
}
var auth = firebase.auth();
var db = firebase.firestore();

function login() {
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    console.log(email)
    console.log(password)

    auth.signInWithEmailAndPassword(email, password)
    .then(function(response){
        var uid = response.user.uid

        db.collection('users').doc(uid).get()
        .then(function(user){
            Swal.fire('Login Successful')
                var obj = user.data()
                obj.id = uid

                localStorage.setItem('userObj', JSON.stringify(obj))
                
                setTimeout(function() {
                    window.location.href = "../../index.html"
                    },2000)
        }).catch(function(error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error.message,
              })
        })
        //window.location.href = "index.html"
     }).catch(function(error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
          })
    })
}

function displayItem() {
    var ul = document.getElementById("inside").innerHTML;
    if(ul.style.display == "none"){
        console.log(ul)
        ul.style.display = "block"
    }
}
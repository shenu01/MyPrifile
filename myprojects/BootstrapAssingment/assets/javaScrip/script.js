document.getElementById("btn-placeOrder").addEventListener("click",function(){
    document.getElementsByClassName("ManagerCustomer")[0].style.display="none"
    document.getElementsByClassName("placeOrder")[0].style.display="block"
    document.getElementsByClassName("Store")[0].style.display="none"
    document.getElementsByClassName("home-area")[0].style.display="none"

});

document.getElementById("btn-ManageCustomer").addEventListener("click",function(){
    document.getElementsByClassName("ManagerCustomer")[0].style.display="block"
    document.getElementsByClassName("placeOrder")[0].style.display="none"
    document.getElementsByClassName("Store")[0].style.display="none"
    document.getElementsByClassName("home-area")[0].style.display="none"

});

document.getElementById("btn-ManageStore").addEventListener("click",function(){
    document.getElementsByClassName("ManagerCustomer")[0].style.display="none"
    document.getElementsByClassName("placeOrder")[0].style.display="none"
    document.getElementsByClassName("Store")[0].style.display="block"
    document.getElementsByClassName("home-area")[0].style.display="none"

});
document.getElementsByClassName("btn-home")[0].addEventListener("click",function(){
    document.getElementsByClassName("ManagerCustomer")[0].style.display="none"
    document.getElementsByClassName("placeOrder")[0].style.display="none"
    document.getElementsByClassName("Store")[0].style.display="none"
    document.getElementsByClassName("home-area")[0].style.display="block"

});
document.getElementsByClassName("btn-home")[1].addEventListener("click",function(){
    document.getElementsByClassName("ManagerCustomer")[0].style.display="none"
    document.getElementsByClassName("placeOrder")[0].style.display="none"
    document.getElementsByClassName("Store")[0].style.display="none"
    document.getElementsByClassName("home-area")[0].style.display="block"

});
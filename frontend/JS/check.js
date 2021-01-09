function collectUrlDatas(){
   let urlInfo = location.search.substring(1).split("&");
    console.log(urlInfo); 

    ////Afficher le prix total de la commande////
    let valuePrice = urlInfo[0].split('=');
    let price = parseInt(valuePrice[1]);
    let totalPrice = document.getElementById('totalPrice');
    totalPrice.innerHTML = price + "€";

    ////Afficher le numéro de la commande////
    let valueNbOrder = urlInfo[1].split('=');
    let nbOrder = valueNbOrder[1];
    orderId.innerHTML = nbOrder;
}
collectUrlDatas();

let idCustomer = localStorage.getItem('tableau');
let  customer = JSON.parse(idCustomer);
let firstName = customer.firstName;
let lastName = customer.lastName;
let customerThanks = document.getElementById('name');
customerThanks.innerHTML = lastName +' ' + firstName;

let addressElt = document.getElementById('address');
let addressCustomer = customer.address;
addressElt.innerHTML = addressCustomer;

let cityElt = document.getElementById('city');
let cityCustomer = customer.city;
cityElt.innerHTML = cityCustomer;

let btnBackToIndex = document.getElementById('btnBackToIndex');
btnBackToIndex.addEventListener('click',function(){
    localStorage.clear();
})

let orderIdValue = localStorage.getItem("confirmationNb");
let orderId = document.getElementById('orderId');
orderId.innerHTML = orderIdValue;

let totalPriceValue = localStorage.getItem('TotalPrice');
let totalPrice = document.getElementById('totalPrice');
totalPrice.innerHTML = totalPriceValue + "€";

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

let orderIdValue = localStorage.getItem("confirmationNb");
console.log(orderIdValue);
let orderId = document.getElementById('orderId');
orderId.innerHTML = orderIdValue;
ajaxCall('http://localhost:3000/api/teddies/',cartBloc);

//////Créer la page cart/////
function cartBloc(){

  ///Récupérer les info contenu dans le local Storage////////
  let values = JSON.parse(localStorage.getItem('cartContent'));

  /////Structure du DOM//////

  let tbody = document.querySelector('tbody');

  for (let value of values){
    let id = value.id;
    ajaxCall('http://localhost:3000/api/teddies/' + id ,recup);
        
    function recup(date){
      let row = document.createElement('tr');
      tbody.appendChild(row);
          
      let column = document.createElement('td');
      row.appendChild(column);

      let container = document.createElement('div');
      column.appendChild(container);
      container.setAttribute('class','display-flex align-center');

      let image = document.createElement('div');
      image.setAttribute('class','img-product');
      container.appendChild(image);
      let img = document.createElement('img');
          
      image.appendChild(img);
      img.setAttribute('src',date.imageUrl);
      img.setAttribute('width','100%');

      let color = document.createElement('div');
      container.appendChild(color);
      color.setAttribute('class','text-align');
      color.innerHTML = value.option;

      let price = document.createElement('td');
      row.appendChild(price)
      price.innerHTML = date.price/100 + "€";

      let quantity = document.createElement('td');
      row.appendChild(quantity);
      quantity.setAttribute('class','product-count');

      let form = document.createElement('form');
      quantity.appendChild(form);
      form.setAttribute('action','#');
      form.setAttribute('class','count-inlineflex')

      let input = document.createElement('input');
      form.appendChild(input);
      input.setAttribute('type','number');
      input.setAttribute('name','quantity');
      input.setAttribute('value',value.quantity);
      input.setAttribute('class','form-control changeQty');

      let totalEach = document.createElement('td');
      totalEach.setAttribute('class','intermediatePrice');
      totalEach.innerHTML = input.value*date.price/100 + '€';
      row.appendChild(totalEach);

/////////////////Indiquer le prix total du panier/////////////////          
    let totalOrder = document.getElementById('totalOrder');
    for(let i in totalEach){
      let content = totalEach.innerHTML;
      deux = parseInt(content);
      let totalPrice = sum += deux;
      
    totalOrder.innerHTML = totalPrice;
    break;
    }


////changer la quantité d'un prduit + modifier le LS/////
      input.addEventListener("change",qty);
      function qty(){
        let cartContent2 = JSON.parse(localStorage.getItem('cartContent'));
        for(var a in cartContent2){
          if(cartContent2[a].option == value.option){
            if(cartContent2[a].quantity !== input.value){
              cartContent2[a].quantity = input.value;
              let cartC = JSON.stringify(cartContent2);
              localStorage.clear();
              localStorage.setItem('cartContent',cartC);
            }
          }
        } 

        totalEach.innerHTML = input.value*date.price/100 + '€'; 
        /////Modifier la quantité finale/////
        let inputElts = document.getElementsByClassName('changeQty');
        sumForChangementInCartQty = 0;
        for(var i = 0 ; i < inputElts.length; i++){
        let inputEltsValue = inputElts[i].value;
        let sToNQty = parseInt(inputEltsValue);
        let finalQty = sumForChangementInCartQty += sToNQty;
        let totalQty = document.getElementById('productQuantity');
        totalQty.innerHTML = '';
        totalQty.innerHTML = finalQty;
        }
        
        
        /////Modifier le prix final/////
        let intermediatePrice = document.getElementsByClassName('intermediatePrice');
        let sumForChangementInCartPrice = 0;
        for(var i = 0; 0 < intermediatePrice.length; i++){
          let priceArticle = intermediatePrice[i].innerHTML;
          let sToN = parseInt(priceArticle);
          console.log(sToN);
          let finalPrice = sumForChangementInCartPrice += sToN;
          totalOrder.innerHTML = '';
          totalOrder.innerHTML = finalPrice;
        }
      }
//////////////////Supprimer totalement un produit/////////////////
        let btnErase = document.createElement('btn');
        btnErase.innerHTML = 'Supprimer';
        btnErase.setAttribute('class','btn btn-lg btn-primary btn-block text-uppercase btn-erase');
        row.appendChild(btnErase);

        let erase = document.getElementsByClassName('btn-erase');
        console.log(erase);
        for(let i = 0; i < erase.length; i++){
          console.log(erase[i]);
          erase[i].addEventListener('click', function(event){
          event.target.parentElement.remove();
          
          let cartContent = JSON.parse(localStorage.getItem('cartContent'));
          //Supprimer du local Storage le produit non souhaité///
          cartContent.splice(i,1);
          console.log(cartContent);
          localStorage.removeItem('cartContent');
          localStorage.setItem('cartContent',JSON.stringify(cartContent)); 
        })
        };
        

////////////////Indiquer le nombre de produits au niveau de la nav/////////////          
        let cartContent = JSON.parse(localStorage.getItem("cartContent"));
        let nbProduct = document.getElementById("nbproduct");
        nbProduct.innerHTML = cartContent.length;

        }
        
    }

}
/////Les totaux au chargement de la page///
//les quantités
let cartC = JSON.parse(localStorage.getItem('cartContent'));
let sum = 0;
for (let i in cartC){
  let productQuantity = document.getElementById('productQuantity');
  let SToN = parseInt(cartC[i].quantity);
  console.log(SToN);
  let TotalArticle = sum += SToN;
  productQuantity.innerHTML = TotalArticle;
}

//////Validation du formulaire////////
let form = document.querySelector('#orderForm');

form.inputLastName.addEventListener('change',function(){
  validLetters(this);
});
form.inputFirstName.addEventListener('change',function(){
  validLetters(this);
});
  
const validLetters = function(inputName){
  let regExp = /^[A-Za-z]+$/;

  let testName = regExp.test(inputName.value);
  let small = inputName.nextElementSibling;

  if (testName){
    small.innerHTML = "Saisie Valide";
    small.classList.remove('text-danger');
    small.classList.add('text-success');
    return true;
  } else {
    small.innerHTML = "Entrer uniquement des lettres";
    small.classList.remove('text-success');
    small.classList.add('text-danger');
    return false;
  }
};

form.inputAddress.addEventListener('change', function(){
  validAddress(this);
});
  
function validAddress(address){
  let regExp = /^\d+\s[A-z]+\s[A-z]+/;

  let testAddress = regExp.test(address.value);
  let small = inputAddress.nextElementSibling;
    
  if(testAddress){
    small.innerHTML = 'Adresse valide';
    small.classList.remove('text-danger');
    small.classList.add('text-success');
    return true;
  } else {
    small.innerHTML = 'Adresse invalide';
    small.classList.remove('text-success');
    small.classList.add('text-danger');
    return false
  }
}

form.inputCity.addEventListener('change',function(){
  validLetters(this);
});

form.inputEmail.addEventListener('change',function(){
  validEmail(this);
});

function validEmail(email){
              
  let regExp = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$/;

  let testEmail = regExp.test(email.value);
  let small = inputEmail.nextElementSibling;

  if(testEmail){
    small.innerHTML = "adresse email valide";
    small.classList.remove('text-danger');
    small.classList.add('text-succes');
    return true;
  } else {
    small.innerHTML = 'adresse email non valide';
    small.classList.remove('text-success');
    small.classList.add('text-danger');
    return false;
  }
}
  
  ///////Envoyer la requête POST///////
let btnOrder = document.getElementById('btnOrder');
btnOrder.addEventListener('click',order);

function order(e){
  e.preventDefault();
  if(validLetters(form.inputFirstName) && validLetters(form.inputLastName) && validLetters(form.inputCity)
    && validAddress(form.inputAddress) && validEmail(form.inputEmail)){


      let firstName = document.getElementById('inputFirstName').value;
      let lastName = document.getElementById('inputLastName').value;
      let address = document.getElementById('inputAddress').value;
      let city = document.getElementById('inputCity').value;
      let email = document.getElementById('inputEmail').value;

        class infoContact {
          constructor(firstName,lastName, address, city, email){
            this.firstName = firstName;
            this.lastName = lastName;
            this.address = address;
            this.city = city;
            this.email = email;
            }
        }


        let contact = new infoContact(firstName,lastName,address,city,email);
        localStorage.setItem('tableau',JSON.stringify(contact));

        let products = [];
        let productCart = JSON.parse(localStorage.getItem("cartContent"));
        for(let i= 0; i< productCart.length; i++){
          products.push(productCart[i].id);
        }


        class infoSend {
          constructor(contact,products){
            this.contact = contact;
            this.products = products;
          }
        }

        let InfoSend = new infoSend(contact, products);


        ajaxPost('http://localhost:3000/api/teddies/order', InfoSend).then(function(response){
              localStorage.setItem('confirmationNb',response.orderId);
              let TotalPriceElt = document.getElementById('totalOrder');
              TotalPrice = TotalPriceElt.innerText;
              localStorage.setItem('TotalPrice',TotalPrice);
              window.location.href = "check.html";
          }).catch(function(err){
              console.log(err);
              if(err === 0){ // requete ajax annulée
                  alert("serveur HS");
              }
            });
  }
}
  






      



//////changer l'affichage de la quantité finale si modification du nbre de produits//////
function changeDisplayQty(){
  let inputElts = document.getElementsByClassName('changeQty');
  sumForChangementInCartQty = 0;
  for(var i = 0 ; i < inputElts.length; i++){
  let inputEltsValue = inputElts[i].value;
  let sToNQty = parseInt(inputEltsValue);//pour convertir la chaine de caractère en nbre
  let finalQty = sumForChangementInCartQty += sToNQty;
  let totalQty = document.getElementById('productQuantity');
  totalQty.innerHTML = '';
  totalQty.innerHTML = finalQty;
  }
}
//////changer l'affichage du prix final si modification du nbre de produits//////
function changeDisplayPrice(){
  let intermediatePrice = document.getElementsByClassName('intermediatePrice');
  let sumForChangementInCartPrice = 0;
  for(var i = 0; 0 < intermediatePrice.length; i++){
    let priceArticle = intermediatePrice[i].innerHTML;
    let sToN = parseInt(priceArticle);
    let finalPrice = sumForChangementInCartPrice += sToN;
    totalOrder.innerHTML = '';
    totalOrder.innerHTML = finalPrice;
  }
}   

var keyCartContent = 'cartContent';
////////Afficher les éléments contenus dans le panier//////
let values = collectLocalS(keyCartContent);
if (values === null || values == 0){
  alert('le panier est vide')
}else{
  showCartProducts();
}

//////Créer le DOM de cart.html/////
function showCartProducts(){

  ////Afficher les infos pour chaque produits contenu dans le local storage/////
  let tbody = document.querySelector('tbody');
  for (let value of values){
    let id = value.id;
    ///Récupérer les infos complémentaires à partir de l'API/////
    ajaxGet('http://localhost:3000/api/teddies/' + id).then( function(response){
    recoverDataFromId(response);
    }).catch(function(error){
      console.log(error);
      alert("Problème lors de la requête au serveur");
    });
    /////Créer le DOM/////    
    function recoverDataFromId(dataFromId){
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
      img.setAttribute('src',dataFromId.imageUrl);
      img.setAttribute('width','100%');

      let color = document.createElement('div');
      container.appendChild(color);
      color.setAttribute('class','text-align');
      color.innerHTML = value.option;

      let price = document.createElement('td');
      row.appendChild(price)
      price.innerHTML = dataFromId.price/100 + "€";

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
      totalIntermediatePrice = document.getElementsByClassName('intermediatePrice');
      totalEach.innerHTML = input.value*dataFromId.price/100 + '€';
      row.appendChild(totalEach);

      //Afficher la quantité totale de produits//////
      let cartC = collectLocalS(keyCartContent);
      let sum = 0;
      for (let i in cartC){
        let productQuantity = document.getElementById('productQuantity');
        let SToN = parseInt(cartC[i].quantity);
        let TotalArticle = sum += SToN;
        productQuantity.innerHTML = TotalArticle;
      }
      /////////////////Indiquer le prix total du panier/////////////////          
      let totalOrder = document.getElementById('totalOrder');
      sumOfPrice = 0;
      for(let i = 0; i < totalIntermediatePrice.length; i++){
        let content = totalIntermediatePrice[i].innerHTML;
        StringToNb = parseInt(content);
        let totalPrice = sumOfPrice += StringToNb;
        totalOrder.innerHTML = totalPrice;
      }
////Changer la quantité d'un produit et modifier le Local Storage/////
      input.addEventListener("change",eventChangeQty);
      function eventChangeQty(){
        let cartContentChangeQty = collectLocalS(keyCartContent);
        for(var a in cartContentChangeQty){
          if(cartContentChangeQty[a].option == value.option){
            if(cartContentChangeQty[a].quantity !== input.value){
              cartContentChangeQty[a].quantity = input.value;
              //let cartContentAfterQtyInput = JSON.stringify(cartContentChangeQty);
              localStorage.clear();
              sendToLocalS(keyCartContent,cartContentChangeQty);
              //localStorage.setItem('cartContent',cartContentAfterQtyInput);
            }
          }
        } 
        totalEach.innerHTML = input.value*dataFromId.price/100 + '€'; 
        changeDisplayQty();
        changeDisplayPrice();    
      }  
      //////////////////Supprimer totalement un produit/////////////////
      let eraseElt = document.createElement('td');
      row.appendChild(eraseElt);
      let btnErase = document.createElement('btn');
      btnErase.innerHTML = 'Supprimer';
      btnErase.setAttribute('class','btn btn-sm mt-2 border-danger text-danger btn-block btn-erase');
      btnErase.setAttribute('data-id',dataFromId._id);
      btnErase.setAttribute('data-option',value.option);
      eraseElt.appendChild(btnErase);

      let erase = document.getElementsByClassName('btn-erase');
      let cartContent = collectLocalS(keyCartContent);
      ////Supprimer le produit du DOM////
      for(let i = 0; i < erase.length; i++){
        erase[i].addEventListener('click', function(event){
          event.target.parentElement.parentElement.remove();
          let id = event.target.getAttribute("data-id");
          let option = event.target.getAttribute("data-option");

          ////Supprimer le produit du local storage/////
          for(let j = 0; j < cartContent.length; j++){
            if(cartContent[j].id == id && cartContent[j].option == option){
            cartContent.splice(j,1);
            localStorage.removeItem('cartContent');
            //localStorage.setItem('cartContent',JSON.stringify(cartContent));
            sendToLocalS(keyCartContent,cartContent);
            break;
            }
          }
          changeDisplayQty();
          changeDisplayPrice();  
            });
        };
        
////////////////Indiquer le nombre de produits au niveau de la nav/////////////          
        let nbProduct = document.getElementById("nbproduct");
        nbProduct.innerHTML = cartContent.length;
        }    
    }
}


//////Validation du formulaire////////
let form = document.querySelector('#orderForm');

////Validation format 100% lettres////
form.inputLastName.addEventListener('change',function(){
  validLetters(this);
});
form.inputFirstName.addEventListener('change',function(){
  validLetters(this);
});

const validLetters = function(inputName){
  let regExp = /^[A-zÀ-ú]+(([',. -][A-zÀ-ú ])?[A-zÀ-ú]*)*$/;

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
////Validation d'un format d'adresse/////
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

////validation d'un format d'email////
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
    small.classList.add('text-success');
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
  e.preventDefault();////empêche d'envoyer une requête si les conditions ne sont pas remplies
  if(validLetters(form.inputFirstName) && validLetters(form.inputLastName) && validLetters(form.inputCity)
    && validAddress(form.inputAddress) && validEmail(form.inputEmail)){

      let firstName = document.getElementById('inputFirstName').value;
      let lastName = document.getElementById('inputLastName').value;
      let address = document.getElementById('inputAddress').value;
      let city = document.getElementById('inputCity').value;
      let email = document.getElementById('inputEmail').value;

      
        let contact = new infoContact(firstName,lastName,address,city,email);
        localStorage.setItem('tableau',JSON.stringify(contact));

        
        let products = [];
        let productCart = collectLocalS(keyCartContent);
        for(let i= 0; i< productCart.length; i++){
          products.push(productCart[i].id);
        }
        
       
        ///Création de l'objet envoyer avec la requête POST///
        let InfoSend = new infoSend(contact, products);

        ajaxPost('http://localhost:3000/api/teddies/order', InfoSend).then(function(response){
              //localStorage.setItem('confirmationNb',response.orderId);
              let TotalPriceElt = document.getElementById('totalOrder');
              TotalPrice = TotalPriceElt.innerText;
              //localStorage.setItem('TotalPrice',TotalPrice);
              //window.location = "check.html";
              window.location = "check.html?price="+TotalPrice + "&nbOrder=" +response.orderId;
          }).catch(function(error){
            console.log(error);
            alert("Problème lors de la requête au serveur");
        });
  }else{
    alert("Remplisser correctement les champs du formulaire de commande!");
  }
}
  




      



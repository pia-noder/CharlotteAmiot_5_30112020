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
        console.log(sToNQty);
        let finalQty = sumForChangementInCartQty += sToNQty;
        console.log(finalQty);
        let totalQty = document.getElementById('productQuantity');
        totalQty.innerHTML = '';
        totalQty.innerHTML = finalQty;
        }
        
        
        /////Modifier le prix final/////
        let intermediatePrice = document.getElementsByClassName('intermediatePrice');
        sumForChangementInCartPrice = 0;
        for(var i = 0; 0 < intermediatePrice.length; i++){
          let priceArticle = intermediatePrice[i].innerHTML;
          let sToN = parseInt(priceArticle);
          let finalPrice = sumForChangementInCart += sToN;
          totalOrder.innerHTML = '';
          totalOrder.innerHTML = finalPrice;
        }


      }
//////////////////Supprimer totalement un produit/////////////////
        let btnDelete = document.createElement('btn');
        btnDelete.innerHTML = 'Supprimer';
        btnDelete.setAttribute('class','btn btn-lg btn-primary btn-block text-uppercase');
        row.appendChild(btnDelete);

////////////////Indiquer le nombre de produits au niveau de la nav/////////////          
        let cartContent = JSON.parse(localStorage.getItem("cartContent"));
        let nbProduct = document.getElementById("nbproduct");
        nbProduct.innerHTML = cartContent.length;

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
//le prix total du panier



    
      //Formulaire de commande///
  let btnOrder = document.getElementById('btnOrder');
  btnOrder.addEventListener('click',order);

  function order(){
    console.log('click');

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
      window.location.href = "check.html";
  }).catch(function(err){
      console.log(err);
      if(err === 0){ // requete ajax annulée
          alert("serveur HS");
      }
    });
  }
}




      



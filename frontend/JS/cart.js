ajaxCall('http://localhost:3000/api/teddies/',cartBloc);

//////Récupérer info du LS/////
function cartBloc(data){
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
          price.innerHTML = date.price;

          let quantity = document.createElement('td');
          row.appendChild(quantity);
          quantity.setAttribute('class','product-count');

          let form = document.createElement('form');
          quantity.appendChild(form);
          form.setAttribute('action','#');
          form.setAttribute('class','count-inlineflex')

           let input = document.createElement('input');
           form.appendChild(input);
           input.setAttribute('type','text');
           input.setAttribute('name','quantity');
           input.setAttribute('value','1');
           input.setAttribute('class','form-control');
         

          let total = document.createElement('td');
          total.innerHTML = input.value*date.price;
          row.appendChild(total);


          let btnDelete = document.createElement('btn');
          btnDelete.innerHTML = 'Supprimer';
          btnDelete.setAttribute('class','btn btn-lg btn-primary btn-block text-uppercase');
          row.appendChild(btnDelete);

          
        let cartContent = JSON.parse(localStorage.getItem("cartContent"));
        let nbProduct = document.getElementById("nbproduct");
        nbProduct.innerHTML = cartContent.length;
          ///Supprimer produit/////
        }
        
    }
      //Formulaire de commande///
  let btnOrder = document.getElementById('btnOrder');
  btnOrder.addEventListener('click',order);

  function order(){
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
      window.location.href('check.html');
  }).catch(function(err){
      console.log(err);
      if(err === 0){ // requete ajax annulée
          alert("serveur HS");
      }
    });
  }
}




      



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
          console.log(date.imageUrl);
          let img = document.createElement('img');
          
          image.appendChild(img);
          img.setAttribute('src',date.imageUrl);
          img.setAttribute('width','100%');

          let color = document.createElement('div');
          container.appendChild(color);
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
           input.setAttribute('class','qty');
         

          let total = document.createElement('td');
          total.innerHTML = input.value*date.price;
          row.appendChild(total);


          let btnDelete = document.createElement('btn');
          btnDelete.innerHTML = 'Supprimer';
          btnDelete.setAttribute('class','btn-danger');
          row.appendChild(btnDelete);

          
          
          ///Supprimer produit/////
        }
        
    }
      
}

//Formulaire de commande///
  let btnOrder = document.getElementById('btnOrder');
  btnOrder.addEventListener('click',order);

  function order(){
    let lastName = document.getElementById('inputLastName').value;
    let firstName = document.getElementById('inputFirstName').value;
    let adress = document.getElementById('inputAdress').value;
    let city = document.getElementById('inputCity').value;
    let email = document.getElementById('inputEmail').value;

    class infoContact {
      constructor(lastName,firstName, adress, city, email){
        this.lastName = lastName;
        this.firstName = firstName;
        this.adress = adress;
        this.city = city;
        this.email = email;
        }
    }
    let contact = new infoContact(lastName,firstName,adress,city,email);

    let idProduct = [];
    let productCart = JSON.parse(localStorage.getItem("cartContent"));
    for(let i= 0; i< productCart.length; i++){
      idProduct.push(productCart[i].id);
      console.log(idProduct);
    }

    class infoSend {
      constructor(contact,idProduct){
        this.contact = contact;
        this.idProduct = idProduct;
      }
    }
    let InfoSend = new infoSend(contact,idProduct);
    console.log(InfoSend);
    ajaxPost('http://localhost:3000/api/teddies/order', InfoSend).then(function(response){
      localStorage.setItem('responseAPI',response.orderId);
    })
  }


      



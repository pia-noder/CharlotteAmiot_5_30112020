ajaxGet('http://localhost:3000/api/teddies',UserImg);

function UserImg(data){
    //Ajouter dans le DOM les images venant de l'API
    for(let i in data){
       let sectionElt = document.querySelector('section');

       let div = document.createElement('div');
       div.setAttribute('class','col-lg-4 col-sm-6 mb-4 px-1');
       sectionElt.appendChild(div);
       let divCard = document.createElement('div');
       divCard.setAttribute('class','card h-100');
       div.appendChild(divCard);

       let link = document.createElement('a');
       link.setAttribute('href','product.html?id='+data[i]._id);
       divCard.appendChild(link);

       let img = document.createElement('img');
       img.setAttribute('src',data[i].imageUrl);
       img.setAttribute('width','100%');
       img.setAttribute('class','card-img-top img-fluid')
       link.appendChild(img);

       let divLegend = document.createElement('div');
       divLegend.setAttribute('class','card-body');
       divCard.appendChild(divLegend);

       let title = document.createElement('h4');
       title.setAttribute('class','card-title');
       title.innerHTML = data[i].name;

       let description =document.createElement('p');
       description.setAttribute('class','card-text');
       description.innerHTML = data[i].description;
       divLegend.appendChild(title);
       divLegend.appendChild(description);

       let price = document.createElement('span');
       price.setAttribute('class','card-text');
       price.innerHTML = data[i].price/100 + '€';
       divLegend.appendChild(price);
    }
}
let cartContent = JSON.parse(localStorage.getItem("cartContent"));
let nbProduct = document.getElementById("nbproduct");
  if(cartContent === null){
    nbProduct.innerHTML = 0;
  }else{
    nbProduct.innerHTML = cartContent.length;  
  }
   
    

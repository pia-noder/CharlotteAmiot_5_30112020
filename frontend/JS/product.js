/////////////////Récupérer Id du produit ///////
function getId(){
    const valeur = window.location.search;
    return valeur.replace('?id=',''); 
}

const id = getId();///intégrer le résultat de la fonction dans une cosntante pour pouvoir la réutiliser plus tard, sans avoir à réécrire le nom de la fonction


//////////////////Récupérer les infos concernant les articles//////////
ajaxGet('http://localhost:3000/api/teddies/' + id).then( function(response){
    showProductFromId(response);
});
////////////Construire le DOM/////

function showProductFromId(data){
    console.log(data);
    let section = document.querySelector('section');
    section.setAttribute('class','m-5 px-3 d-md-flex');
     let div = document.createElement('div');
     div.setAttribute('class','col-md-7');
     section.appendChild(div);
     let img = document.createElement('img');
     img.setAttribute('src',data.imageUrl);
     img.setAttribute('width','100%');
    div.appendChild(img);
        ////Info/////
    let info = document.createElement('div');
    info.setAttribute('class','col-md-4');
    section.appendChild(info);

    let name = document.createElement('h3');
    name.setAttribute('class','my-3 product-name');
    name.innerHTML = data.name;
    info.appendChild(name);

    let description = document.createElement('p');
    description.innerHTML = data.description;
    info.appendChild(description);

    /////titre "Détails"/////
    let details = document.createElement('h3');
    details.innerHTML = 'Détails';
    details.setAttribute('class','my-3');
    info.appendChild(details);
    
    ///////Choix des options/////////
    let form = document.createElement('form');
    let paragraphe = document.createElement('p');
    form.appendChild(paragraphe);
    info.appendChild(form);
    let select = document.createElement('select');
    select.setAttribute('id','color');
    select.setAttribute('class','form-select');
        //////Label////
    let label = document.createElement('label');
    label.setAttribute('for','color');
    label.setAttribute('class','form-label');
    paragraphe.appendChild(label);
    paragraphe.appendChild(select);
    for(let i in data.colors){
        let option = document.createElement('option');
        select.appendChild(option);
        option.setAttribute('value',data.colors[i]);
        option.innerHTML = data.colors[i];
    }
    let price = document.createElement('p');
    price.setAttribute('class','fw-bold');
    info.appendChild(price);
    price.innerText = data.price/100 + '€';
    let btn = document.createElement('button');
    btn.setAttribute('class','btn btn-primary');
    btn.setAttribute('type','submit');
    btn.innerText = "Ajouter au Panier";
    info.appendChild(btn);
  
    ///////Envoyer dans le local Storage/////
    function addToCart(optionSelected){
        let cartContent = JSON.parse(localStorage.getItem("cartContent"));
        //Si le local storage est vide créé le tableau qui contiendra les produits
        if(cartContent === null){
            cartContent = [];
        }
        for (let i in cartContent){
            if(cartContent[i].id === id && cartContent[i].option === optionSelected){
                cartContent[i].quantity ++;         
            }      
        }
        //s'il n'y a pas déjà un objet identique dans le tableau alors on créé un nouvel objet     
        let product = new infoProduct(id, optionSelected, 1);
        cartContent.push(product); 
        localStorage.setItem('cartContent',JSON.stringify(cartContent));
    }

    btn.addEventListener('click', function(){ 
        const select = document.getElementsByTagName("select");         
        const optionSelected = select[0].value;///car select est un tableau donc il faut indiquer un emplacement
            
        addToCart(optionSelected);
        alert("Produit ajouté au panier");
    });

    ////Ajouter nbre d'article dans le panier dans la nav/////////
    let cartContent = JSON.parse(localStorage.getItem("cartContent"));
    let nbProduct = document.getElementById("nbproduct");
    if(cartContent === null){
        nbProduct.innerHTML = 0;
    }else{
        nbProduct.innerHTML = cartContent.length;  
    }
}


class infoProduct{
    constructor(id, option, quantity){
        this.id = id;
        this.option = option;
        this.quantity = quantity;
    }
}

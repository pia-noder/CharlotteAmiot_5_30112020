/////Définition des clés utilisées pour le local storage////
var keyCartContent = 'cartContent';

/////////////////Récupérer l'id du produit ///////
function getId(){
    const valeur = window.location.search;
    return valeur.replace('?id=',''); 
}

const id = getId();//intégrer le résultat de la fonction dans une
                    //constante pour pouvoir la réutiliser plus tard, sans avoir à réécrire le nom de la fonction


//////////////////Récupérer les datas concernant les produits au prêt de l'API//////////
ajaxGet('http://localhost:3000/api/teddies/' + id).then( function(response){
    showProductFromId(response);
}).catch(function(error){
    console.log(error);
        alert("Problème lors de la requête au serveur");
});

////////////Construire le DOM/////
function showProductFromId(data){
    let section = document.querySelector('section');
    section.setAttribute('class','m-5 px-3 d-md-flex');

    ////Création de la div contenant l'image////
    let div = document.createElement('div');
    div.setAttribute('class','col-md-7');
    section.appendChild(div);
    let img = document.createElement('img');
    img.setAttribute('src',data.imageUrl);
    img.setAttribute('width','100%');
    div.appendChild(img);
    
    ////Création de la div contenant  les infos du produits////
    let info = document.createElement('div');
    info.setAttribute('class','col-md-4 mx-3');
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
    
    ///////Afficher option des couleurs/////////
    let form = document.createElement('form');
    let paragraphe = document.createElement('p');
    form.appendChild(paragraphe);
    info.appendChild(form);
    let select = document.createElement('select');
    select.setAttribute('id','color');
    select.setAttribute('class','form-select');
    
    let label = document.createElement('label');
    label.setAttribute('for','color');
    label.setAttribute('class','form-label');
    paragraphe.appendChild(label);
    paragraphe.appendChild(select);
    
    console.log(data.colors);
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

    ////Bouton d'ajout au panier///
    let btn = document.createElement('button');
    btn.setAttribute('class','btn btn-primary');
    btn.setAttribute('type','submit');
    btn.innerText = "Ajouter au Panier";
    info.appendChild(btn);

    btn.addEventListener('click', function(){ 
        const select = document.getElementsByTagName("select");         
        const optionSelected = select[0].value;///car select est un tableau donc il faut indiquer un emplacement
            
        addToCart(optionSelected);
        alert("Produit ajouté au panier");
    });
} 

/////////////Envoyer dans le local Storage////////////
function addToCart(optionSelected){
    let cartContent = collectLocalS(keyCartContent);
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
    sendToLocalS(keyCartContent,cartContent)
}

qtyDisplayInNav();




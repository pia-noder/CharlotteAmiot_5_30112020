//////////Requête GET envoyer à l'API/////////////
function ajaxGet(url){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.onload = function(){
            if(this.status === 200){
                resolve(JSON.parse(this.response));
            }else{
                reject(xhr.status);
            }
        }
       xhr.send(); 
    });
}

//////////Requête POST envoyer à l'API/////////////
function ajaxPost(url,InfoSended){
    return new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('POST',url,true);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onreadystatechange = function () {
                if(this.readyState === XMLHttpRequest.DONE){
                    console.log(this.readyState);
                if(this.status === 201){
                    resolve(JSON.parse(this.response));
                }else{
                    reject(xhr.status);
                } 
            }
            
        };
       xhr.send(JSON.stringify(InfoSended));
    });
}

////Afficher le nbre d'article dans la nav/////////
function qtyDisplayInNav (){
    let cartContent = JSON.parse(localStorage.getItem("cartContent"));
    let nbProduct = document.getElementById("nbproduct");
    if(cartContent === null){
    nbProduct.innerHTML = 0;
    }else{
    nbProduct.innerHTML = cartContent.length;  
    }
};

/////Récupérer le contenu du localStorage////
function collectLocalS(key){
    return JSON.parse(localStorage.getItem(key));
};

///Envoyer des données dans le localStorage////
function sendToLocalS(key, dataSend){
    localStorage.setItem(key,JSON.stringify(dataSend));
}







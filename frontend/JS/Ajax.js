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








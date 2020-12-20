
/////////////////////////////////////////
function ajaxCall(url,callback){
    var xhr = new XMLHttpRequest();
    xhr.open('GET',url);
    xhr.onload = function(){
            if(this.status === 200){
                var response = JSON.parse(this.responseText);
                callback(response);
            }else{
                console.log(xhr.status);
            }
        }
    xhr.send();
}
///////////////////////
function ajaxPost(url,InfoSended){
    let promise = new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('POST',url,true);
        xhr.setRequestHeader("Content-Type", "application/json");
        console.log('OK');

        xhr.onreadystatechange = function () {
            console.log('vue');
                if(this.readyState ===XMLHttpRequest.DONE){
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








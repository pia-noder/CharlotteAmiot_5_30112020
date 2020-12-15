
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
    console.log('request successed')
}
///////////////////////
function ajaxPost(url,dataSended){
    let promise = new Promise(function(resolve, reject){
        var xhr = new XMLHttpRequest();
        xhr.open('POST',url);
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.onload = function(){
            if(this.status === 200){
                resolve(JSON.parse(this.responseText));
                console.log("post bien réalisé");
            }else{
                reject(xhr.status);
            }
        };
        xhr.send(JSON.stringify(dataSended));
    });
    return promise;
}







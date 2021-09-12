function posData(auth,prod) {
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();     
        http.onload = function () { 
            resolve(http.response); 
        };
        http.onerror = function (e) {
            reject(e); 
        };
        http.open(
            "POST",
            `http://localhost:9081/api/products/`
        );
        http.setRequestHeader('Authorization',auth);
        http.setRequestHeader('Content-Type','application/json');    
        http.send(JSON.stringify(prod));
    });
}

window.onload=function(){
    let user=localStorage.getItem('Cred');
    let credentials = user.split(" ")[1];
    let username = credentials.split(":")[0]; 
    document.getElementById('logged').innerHTML=`Hi, ${username.charAt(0).toUpperCase()}${username.slice(1)} `;

    document.getElementById('clrbtn').addEventListener('click',function(){
        let clr=document.getElementsByName('clr');
        for(let i=0;i<clr.length;i++){
            clr[i].value="";
        }
    },false);

    document.getElementById('sbtbtn').addEventListener('click',function(){
        let product={
            ProductId: document.getElementById('prodid').value,
          ProductName: document.getElementById('prodname').value,
          CategoryName: document.getElementById('prodcat').value,
          Manufacturer:document.getElementById('prodman').value,
          Description: document.getElementById('proddes').value,
          Price: parseInt(document.getElementById('prodprice').value)
        };
        console.log('In sbtbtn');
        let auth = localStorage.getItem('Cred');
        let response=posData(auth,product);
        response.then(function(resp){
            document.getElementById('msg').innerHTML = resp;
            document.getElementById('clrbtn').click();
        }).catch(function(e){
            document.getElementById('msg').innerHTML = e;      
        });
    },false);


    document.getElementById('logout').addEventListener('click',function(){
        localStorage.clear();
        document.getElementById('Logoutbtn').click();
    },false);

    document.getElementById('prod').addEventListener('click',function(){
        document.getElementById('Products').click();
    },false);
}    
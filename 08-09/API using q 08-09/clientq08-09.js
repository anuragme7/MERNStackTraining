const serviceClient = require('./callserviceusingq08-09');

const clientObject = new serviceClient(); 

const getoptions = {
    host: 'localhost',
    port: '9080',
    path: '/home',
    method: 'GET'
};

clientObject.getData(getoptions).then((data)=>{
    console.log(`GET Call ${data}`);
    console.log();
}).catch((error)=>{
    console.log(`Communication Error ${error}`);
});

 let product=JSON.stringify({"ProductId":150,"ProductName":"Mouse","CategoryName":"Electronics","Price":999});
 
const postoptions = {
    host: 'localhost',
    port: '9080',
    path: '/home',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(product)
    }
};

clientObject.postData(postoptions,product).then((data)=>{
    console.log(`POST Call ${data}`);
    console.log();
}).catch((error)=>{
    console.log(`Communication Error ${error}`);
});

let productid=JSON.stringify(102);
const deloptions = {
    host: 'localhost',
    port: '9080',
    path: '/home',
    method: 'DELETE',
    headers: {
        'id': productid
    }
};

clientObject.delData(deloptions).then((data)=>{
    console.log(`DELETE Call ${data}`);
    console.log();
}).catch((error)=>{
    console.log(`Communication Error ${error}`);
});

let delproduct=JSON.stringify({"ProductId":101,"ProductName":"Mouse","CategoryName":"Electronics","Price":999});

const putoptions = {
    host: 'localhost',
    port: '9080',
    path: '/home',
    method: 'PUT',
    headers: {
        'id': JSON.stringify(101),
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(delproduct)
    }
};

clientObject.putData(putoptions,delproduct).then((data)=>{
    console.log(`PUT Call ${data}`);
    console.log();
}).catch((error)=>{
    console.log(`Communication Error ${error}`);
});
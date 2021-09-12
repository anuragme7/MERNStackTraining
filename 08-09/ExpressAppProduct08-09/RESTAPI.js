const express = require("express");
const cors = require("cors");
const path = require('path');
const dal = require("./dal/asyncapi");

const instance = express();
instance.use(express.urlencoded({ extended: false }));

instance.use(express.json());

instance.use(
    express.static(path.join(__dirname, './../../node_modules/bootstrap/dist/css'))
);

instance.use(
    express.static(path.join(__dirname, './../views'))
);

let router = express.Router();
instance.use(router);

instance.use(
  cors({
    origin: "*", 
    allowedHeaders: "*", 
    methods: "*", 
  })
);


const dalObject = new dal();

router.get("/",(req,resp) => {
    resp.sendFile('Login.html', {
        root: path.join(__dirname, './../views')
    });
});

router.get("/login",dalObject.login);

router.get("/Products",(req,resp) => {
    resp.sendFile('Products.html', {
        root: path.join(__dirname, './../views')
    });
});

router.get("/Logout",(req,resp)=>{
    resp.sendFile('Logout.html', {
        root: path.join(__dirname, './../views')
    });
});

router.get("/AddProduct",(req,resp)=>{
    resp.sendFile('AddProduct.html', {
        root: path.join(__dirname, './../views')
    });
});

router.get("/UpdateProduct",(req,resp)=>{
    resp.sendFile('UpdateProduct.html', {
        root: path.join(__dirname, './../views')
    });
});

router.get("/api/products", dalObject.getpro);

router.get("/api/products/:id", dalObject.getprobyid );

router.delete("/api/products/:id",dalObject.delpro) ;

router.post("/api/products", dalObject.createpro);

router.put("/api/products/:id", dalObject.updpro);

instance.listen(9081, () => {
  console.log("REST APIs are on port 9081");
});

const express = require("express");
const cors = require("cors");
const dal = require("./dal/dataaccess");

const instance = express();
instance.use(express.urlencoded({ extended: false }));

instance.use(express.json());


instance.use(
  cors({
    origin: "*", 
    allowedHeaders: "*", 
    methods: "*", 
  })
);

const dalObject = new dal();

instance.get("/api/products", (req, resp) => {
  let authHeader = req.headers.authorization;
  
  let credentials = authHeader.split(" ")[1];
  
  let userName = credentials.split(":")[0]; 
  let password = credentials.split(":")[1];

  if (dalObject.validateUser(userName,password)) {
    let products = dalObject.getProducts();
    resp.status(200).send({ data: products });
  } else {
    resp.status(401).send({ message: "Credentials are invalid" });
  }
  
});

instance.get("/api/products/:id", (req, resp) => {
  let authHeader = req.headers.authorization;
  let credentials = authHeader.split(" ")[1];
  let userName = credentials.split(":")[0]; 
  let password = credentials.split(":")[1];
  if (dalObject.validateUser(userName,password)) {
    let id = req.params.id;
    let product = dalObject.getProductsById(id);
    if (product == null || product === undefined || !product) {
      resp.status(404).send({ message: "Record not found, it may be deleted" });
    } else {
      resp.status(200).send({ data: product });
    }
  } else {
    resp.status(401).send({ message: "Credentials are invalid" });
  }
  
});

instance.delete("/api/products/:id", (req, resp) => {
  let authHeader = req.headers.authorization;
  let credentials = authHeader.split(" ")[1];
  let userName = credentials.split(":")[0]; 
  let password = credentials.split(":")[1];
  if (dalObject.validateUser(userName,password)) {
    let id = req.params.id;
      if(dalObject.deleteProduct(id)){
        resp.status(200).send({ message: "Record Deleted" });
      }
      else{
        resp.status(404).send({ message: "Record Not Found" });

      }
  } else {
    resp.status(401).send({ message: "Credentials are invalid" });
  }
});

instance.post("/api/products", (req, resp) => {
  let authHeader = req.headers.authorization;
  let credentials = authHeader.split(" ")[1];
  let userName = credentials.split(":")[0]; 
  let password = credentials.split(":")[1];
  if (dalObject.validateUser(userName,password)) {
    let product = req.body;
    let products = dalObject.createProduct(product);
    resp.status(200).send({ data: products });
  } else {
    resp.status(401).send({ message: "Credentials are invalid" });
  }
  
});

instance.put("/api/products/:id", (req, resp) => {
  // logic
  // read header and search record, if found read data from body and update the array and send response
  // if id is empty or record not found generate errro occrdingly
  let authHeader = req.headers.authorization;
  let credentials = authHeader.split(" ")[1];
  let userName = credentials.split(":")[0]; 
  let password = credentials.split(":")[1];
  if (dalObject.validateUser(userName,password)) {
    let id = req.params.id;
    let product = dalObject.getProductsById(id);
    if (product == null || product === undefined || !product) {
      resp.status(404).send({ message: "Record not found, it may be deleted" });
    } else {
      let productdata = req.body;
      if(dalObject.updateProduct(productdata)){
        resp.status(200).send({ message: "Product Updated" });
      }
      else{
        resp.status(401).send({ message: "Please provide the same ID as in URL" });
      }
    }
    
  } else {
    resp.status(401).send({ message: "Credentials are invalid" });
  }
});



instance.listen(9081, () => {
  console.log("REST APIs are on port 9081");
});

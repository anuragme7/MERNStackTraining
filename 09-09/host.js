const express = require("express");
const cors = require("cors");
const path = require('path');
const instance = express();
instance.use(express.urlencoded({ extended: false }));

instance.use(express.json());

instance.use(
    express.static(path.join(__dirname, './../node_modules/bootstrap/dist/css'))
);

instance.use(
    express.static(path.join(__dirname, './views'))
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

router.get("/",(req,resp) => {
    resp.sendFile('Login.html', {
        root: path.join(__dirname, './views')
    });
});

router.get("/Departments",(req,resp) => {
    resp.sendFile('Departments.html', {
        root: path.join(__dirname, './views')
    });
});

router.get("/Logout",(req,resp)=>{
    resp.sendFile('Logout.html', {
        root: path.join(__dirname, './views')
    });
});

router.get("/AddDepartment",(req,resp)=>{
    resp.sendFile('AddDepartment.html', {
        root: path.join(__dirname, './views')
    });
});

router.get("/UpdateDepartment",(req,resp)=>{
    resp.sendFile('UpdateDepartment.html', {
        root: path.join(__dirname, './views')
    });
});

instance.listen(9080, () => {
    console.log("REST APIs are on port 9080");
  });
  
const express = require("express");
const cors = require("cors");
const path = require('path');
const daldb =require("./dal/dataaccessdb");

const instance = express();
instance.use(express.urlencoded({ extended: false }));

instance.use(express.json());

let router = express.Router();
instance.use(router);

instance.use(
  cors({
    origin: "*", 
    allowedHeaders: "*", 
    methods: "*", 
  })
);

const dalObject = new daldb();

instance.get("/login",dalObject.login);

instance.get("/api/departments", dalObject.getDepartments);

instance.get("/api/departments/:id", dalObject.getDepartmentById );

instance.delete("/api/departments/:id",dalObject.deleteDepartment) ;

instance.post("/api/departments", dalObject.createDepartment);

instance.put("/api/departments/:id", dalObject.updateDepartment);

instance.listen(9081, () => {
  console.log("REST APIs are on port 9081");
});

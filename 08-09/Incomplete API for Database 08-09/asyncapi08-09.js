const express = require("express");
const cors = require("cors");
const dataAccess = require('./dal/dataaccess08-09');

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

// define an instance of the DataAccess
let objDal =new dataAccess();

// REST API with callback
// the calback methdo will be passed with request,response object 
instance.get("/api/departments", objDal.getDepartments);
instance.get("/api/departments/:id", objDal.getDepartmentById);
instance.post("/api/departments", objDal.createDepartment);
instance.put("/api/departments/:id", objDal.updateDepartment);
instance.delete("/api/departments/:id", objDal.deleteDepartment);



instance.listen(9081, () => {
    console.log("REST APIs are on poty 9081");
  });
  
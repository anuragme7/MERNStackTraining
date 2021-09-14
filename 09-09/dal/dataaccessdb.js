const path = require("path");
const daluser=require("./Users")
const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("Company", "root", "Manofsteel@1", {
  host: "localhost",
  dialect: "mysql",
  pool: {
    min: 0,
    max: 5,
    idle: 10000,
  },
  define: {
    timestamps: false,
  },
});

const deptModel = require(path.join(__dirname, "./../models/Department"))(
  sequelize,
  Sequelize.DataTypes
);

let userObj=new daluser();

class DepartmentDataAccess {

    async login(req,resp){
      let authHeader = req.headers.authorization;
      if(await userObj.validateUser(authHeader)){
          resp.status(200).send(JSON.stringify(true));   
      }
      else{
          resp.status(400).send(JSON.stringify(false));   
      }
    }
  
    async getDepartments(req,resp){
      let authHeader = req.headers.authorization;
      if(userObj.validateUser(authHeader)){
        
        await sequelize.sync({force:false});
        let rows = await deptModel.findAll();
        if(rows) {
           return resp.status(200).send({
                message: "Data is Read Successfully",
                rowCount: rows.length,
                rows: rows,
              });
        }
        return resp
        .status(500) 
        .send(JSON.stringify("Some Error Occured")); 
      }
      return resp.status(401).send(JSON.stringify("Credentials Invalid"));
    }


    async getDepartmentById(req,resp){
      let authHeader = req.headers.authorization;
      if(userObj.validateUser(authHeader)){
        let id = parseInt(req.params.id);
        console.log(id);
        await sequelize.sync({force:false});
        let row=await deptModel.findOne({where:{DeptNo:id}});
        if(row!==null) {
          return resp.status(200).send({
            message: "Data is Read Successfully",
            rowCount: 1,
            rows: row,
          });
        }else{
              return resp.status(200).send({
                message: "No records available",
                rowCount: 0,
                rows: {},
              });
        }
        // else{
        //   return resp
        //   .status(500)
        //   .send({ message: "Some Error Occured" });
        // } 
      }  
      return resp.status(401).send(JSON.stringify("Credentials Invalid"));

    }

    async createDepartment(req,resp){
      let authHeader = req.headers.authorization;
      if(userObj.validateUser(authHeader)){
        const dept  = req.body;
        await sequelize.sync({ force: false });
        deptModel.create(dept).then((response)=>{
          console.log(`in then ${response}`);
          return resp.status(200).send( JSON.stringify("Data is Added Successfully"));
        }).catch((err)=>{
          return resp
            .status(500)  
            .send(`Error Occured : ${err.message} The DeptNo may already be present in DataBase`);
        });
      }
      else{
        return resp.status(401).send(JSON.stringify("Credentials Invalid"));
      }


    }

    async updateDepartment(req,resp){
      let authHeader = req.headers.authorization;
      if(userObj.validateUser(authHeader)){
        let id = parseInt(req.params.id);
        const dept  = req.body;
        await sequelize.sync({ force: false });
        let rec = deptModel.update({
          DeptName:dept.DeptName,
          Location: dept.Location,
          Capacity:dept.Capacity
      },{
          where:{DeptNo:id}
      }); 
      if(rec){
          return resp.status(200).send(JSON.stringify("Data is Updated Successfully"));
        }
    
        return resp
            .status(500)  
            .send({ message: "Some Error Occured" }); 
    }
    return resp.status(401).send(JSON.stringify("Credentials Invalid"));

  }

  async deleteDepartment(req,resp){
    console.log('In delete');
    let authHeader = req.headers.authorization;
    if(userObj.validateUser(authHeader)){
        let id = parseInt(req.params.id);
        await sequelize.sync({ force: false });
        deptModel.destroy({
            where:{DeptNo:id}
          }).then((response)=>{
              console.log(`in then ${response}`);
              return resp.status(200).send( JSON.stringify("Data is Deleted Successfully"));
          }).catch((err)=>{
              return resp
                .status(500)  
                .send(`Error Occured : ${err.message}`);
          });  
        // if(rec){
        //   if(rec.length===0 || rec.length===undefined){
        //     return resp.status(401).send(JSON.stringify("Cannot delete since the DeptNo is linked with another table"));
        //   }
        //   return resp.status(200).send({
        //     message: "Data is Deleted Successfully",
        //     rows: rec,
        //   });
        // }

        // return resp
        //     .status(500)  
        //     .send({ message: "Some Error Occured" }); 
    }
    else{
      return resp.status(401).send(JSON.stringify("Credentials Invalid"));
    }
  }
}
module.exports = DepartmentDataAccess;















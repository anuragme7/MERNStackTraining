const {Sequelize,DataTypes}  =  require('sequelize');
const path = require('path');
const sequelize = new Sequelize("roles", "root", "P@ssw0rd", {
    host: 'localhost',
    dialect:'mysql'
});


const role = require(path.join(__dirname, './../models/role'))(sequelize, Sequelize.DataTypes);

const user = require(path.join(__dirname, './../models/user'))(sequelize, Sequelize.DataTypes);

const userinrole = require(path.join(__dirname, "./../models/userinrole"))(
    sequelize,
    Sequelize.DataTypes
  );

const deptModel = require(path.join(__dirname, "./../models/department"))(
sequelize,
Sequelize.DataTypes
);  

class AuthLogic {


    async newRole(req,resp){
        let roleinfo = req.body;
        await sequelize.sync({force:false});
        let rolid = await role.findOne({where:{RoleId: roleinfo.RoleId}});
        if(rolid!==null) {
            return resp.status(409).send({message: `RoleId ${roleinfo.RoleId} already exists`});
        }
        let rolname = await role.findOne({where:{RoleName: roleinfo.RoleName}});
        if(rolname!==null) {
            return resp.status(409).send({message: `RoleName ${roleinfo.RoleName} already exists`});
        }
        let created  = await role.create(roleinfo);
        return resp.status(201).send({message: `RoleId ${roleinfo.RoleId} for Role ${roleinfo.RoleName} Created`});
    }

    async newUser(req,resp){

        let userinfo = req.body;
        await sequelize.sync({force:false});
        let usr = await user.findOne({where:{UserId: userinfo.UserId}});
        if(usr!==null) {
            return resp.status(409).send({message: `UserId ${userinfo.UserId} already exists`});
        }
        let usrem = await user.findOne({where:{Email: userinfo.Email}});
        if(usrem!==null) {
            return resp.status(409).send({message: `Email ${userinfo.Email} already exists`});
        }
        let created  = await user.create(userinfo);
        return resp.status(201).send({message: `UserId ${userinfo.UserId} registered successfully`});
    }

    async newUserRole(req,resp){

        let userinfo = req.body;
        await sequelize.sync({force:false});
        let rel = await userinrole.findOne({where:{RelationId: userinfo.RelationId}});
        if(rel!==null) {
            return resp.status(409).send({message: `UserId ${userinfo.RelationId} already exists`});
        }
        let usr = await user.findOne({where:{UserId: userinfo.UserId}});
        if(usr===null) {
            return resp.status(409).send({message: `UserId ${userinfo.UserId} does not exists`});
        }
        let rolid = await role.findOne({where:{RoleId: userinfo.RoleId}});
        if(rolid===null) {
            return resp.status(409).send({message: `RoleId ${userinfo.RoleId} does not exists`});
        }
        let created  = await userinrole.create(userinfo);
        return resp.status(201).send({message: `UserId ${userinfo.UserId} for RoleId ${userinfo.RoleId} registered successfully`});

    }

    async login(req,resp){
         let userinfo = req.body;
         let usr = await user.findOne({where:{Email: userinfo.Email}});
        if(usr===null) {
            return resp.status(409).send({message: `Email ${userinfo.Email} does not exists`});
        }
         if(usr.Password.trim() !== userinfo.Password.trim()){
             return resp.status(401).send({message: `Email ${userinfo.Email} Password does not match`});
         }
         req.session.loggedin = true;
         req.session.name = usr.UserId;
         console.log(`Current Session started for the user = ${req.session.name}`);
         return resp.status(200).send({message: `UserId ${usr.UserId} login successfull`});
    }

    async logout(req,resp){
        console.log(`UserId in logout request= ${req.session.name}`);
        req.session.destroy();
        return resp.status(200).send({message: 'Logged out Successfully'});
    }

    async getData(req,resp){
        if(req.session.name === undefined){
            return resp.status(401).send({message: `Either authentication is not done or else the session is expired. Please gonin again`});
        }
        let id=parseInt(req.session.name);
        await sequelize.sync({force:false});
        let rolename=await sequelize.query(`SELECT RoleName from role INNER JOIN userinrole where role.RoleId = userinrole.RoleId and userinrole.UserId=${id}`);
        let namer=rolename[0][0].RoleName;
        if(namer==='Admin'||namer==='Manager'||namer==='Operator'){
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
        return resp.status(409).send({message:`The Role ${namer} does not have clearance`});
    }

    async postData(req,resp){
        if(req.session.name === undefined){
            return resp.status(401).send({message: `Either authentication is not done or else the session is expired. Please gonin again`});
        }
        let id=parseInt(req.session.name);
        await sequelize.sync({force:false});
        let rolename=await sequelize.query(`SELECT RoleName from role INNER JOIN userinrole where role.RoleId = userinrole.RoleId and userinrole.UserId=${id}`);
        let namer=rolename[0][0].RoleName;
        if(namer==='Admin'||namer==='Manager'){
            let dept  = req.body;
            let depar = await deptModel.findOne({where:{DeptNo: dept.DeptNo}});
            if(depar!==null) {
                return resp.status(409).send({message: `DeptNo ${dept.DeptNo} already exists`});
            }   
            let rec = deptModel.create(dept); 
            if(rec){
                return resp.status(200).send({
                    message: "Data is Added Successfully",
                    rows: rec,
                });
            }
    
            return resp
                .status(500)  
                .send({ message: "Some Error Occured" }); 
        }
        return resp.status(409).send({message:`The Role ${namer} does not have clearance`});
    }

    async deleteData(req,resp){
        if(req.session.name === undefined){
            return resp.status(401).send({message: `Either authentication is not done or else the session is expired. Please gonin again`});
        }
        let id=parseInt(req.session.name);
        await sequelize.sync({force:false});
        let rolename=await sequelize.query(`SELECT RoleName from role INNER JOIN userinrole where role.RoleId = userinrole.RoleId and userinrole.UserId=${id}`);
        let namer=rolename[0][0].RoleName;
        if(namer==='Admin'){
            let delid = parseInt(req.params.id);
            let depar = await deptModel.findOne({where:{DeptNo: delid}});
            if(depar===null) {
                return resp.status(409).send({message: `DeptNo ${delid} does not exists`});
            }
            let rec = deptModel.destroy({
                where:{DeptNo:delid}
            }); 
             if(rec){
                return resp.status(200).send({
                  message: "Data is Deleted Successfully",
                  rows: rec,
                });
              }
            return resp
                .status(500)  
                .send({ message: "Some Error Occured" }); 
        }
        return resp.status(409).send({message:`The Role ${namer} does not have clearance`});
    }

    async putData(req,resp){
        if(req.session.name === undefined){
            return resp.status(401).send({message: `Either authentication is not done or else the session is expired. Please gonin again`});
        }
        let id=parseInt(req.session.name);
        await sequelize.sync({force:false});
        let rolename=await sequelize.query(`SELECT RoleName from role INNER JOIN userinrole where role.RoleId = userinrole.RoleId and userinrole.UserId=${id}`);
        let namer=rolename[0][0].RoleName;
        if(namer==='Admin'||namer==='Manager'){
            let dept  = req.body;
            let depar = await deptModel.findOne({where:{DeptNo: dept.DeptNo}});
            if(depar===null) {
                return resp.status(409).send({message: `DeptNo ${dept.DeptNo} does not exists`});
            } 
            let putid = parseInt(req.params.id);
            await sequelize.sync({ force: false });
            let rec = deptModel.update({
                DeptName:dept.DeptName,
                Location: dept.Location,
                Capacity:dept.Capacity
            },{
                where:{DeptNo:putid}
            }); 
            if(rec){
                return resp.status(200).send({
                message: "Data is Updated Successfully",
                rows: rec,
                });
            }
  
            return resp
                .status(500)  
                .send({ message: "Some Error Occured" }); 
        }
        return resp.status(409).send({message:`The Role ${namer} does not have clearance`});
    }

    
}

module.exports = AuthLogic;

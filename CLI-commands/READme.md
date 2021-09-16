# 07-09

"Directory read"-
node "CRUD using API and Directory Read 07-09"/"Directory Read"/fsmodule/directoryfile07-09.js


"Route Pages (Remove Hardcoding)"-
node "CRUD using API and Directory Read 07-09"/"Product API Assign 1 and Assign 2"/routewebserver07-09.js


"HOST API and Front-end on same port"-
nodemon "CRUD using API and Directory Read 07-09"/"Product API Assign 1 and Assign 2"/ProductsCrudusingAPI07-09.js


# 08-09

"Using q"-
nodemon "CRUD using API and Directory Read 07-09"/"Product API Assign 1 and Assign 2"/ProductsCrudusingAPI07-09.js

node 08-09/"API using q 08-09"/clientq08-09.js


"REST API with validation and CRUD"-
node 08-09/"REST API for CRUD and Validation 08-09"/api.js

Must use ARC for testing the API



"Multi-page CRUD, validation on Array"-
nodemon 08-09/ExpressAppProduct08-09/RESTAPI.js

nodemon 08-09/ExpressAppProduct08-09/host.js


# 09-09

"Multi-page CRUD, validation on DataBase"-
nodemon 09-09/RESTAPI.js

nodemon 09-09/host.js

# 15-09

"API with Role" -
nodemon 15-09/RESTAPI.js

Register New Role
POST  http://localhost:9080/api/app/registerrole

{
    "RoleId" : 102,
    "RoleName" : Manager
}

Register New User
POST  http://localhost:9080/api/app/registeruser

{
    "UserId" : 202,
    "Email" : myuser1@gmail.com,
    "Password" : Pass@123

}

Register UserInRole
POST  http://localhost:9080/api/app/userinrole

{
    "RelationId" : 2,
    "UserId" : 202,
    "RoleId" : 102

}

Login with Email Pass
POST  http://localhost:9080/api/app/login

{
    "Email" : myuser1@gmail.com,
    "Password" : Pass@123
}

Logout
POST  http://localhost:9080/api/app/logout

Get Data
GET  http://localhost:9080/api/app/get

Post Data
POST  http://localhost:9080/api/app/post

{
    "DeptNo":180,
    "DeptName":Corporate,
    "Location":Pune,
    "Capacity":70
}

Delete Data
DELETE  http://localhost:9080/api/app/delete/:id

Put Data
PUT  http://localhost:9080/api/app/delete/:id

{
    "DeptNo":180,
    "DeptName":Corporate,
    "Location":Hyderabad,
    "Capacity":90
}







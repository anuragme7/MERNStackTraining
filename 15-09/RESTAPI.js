const express  =require('express');
const session =require('express-session');
const create = require('./dal/dataaccess');
const instance = express();
instance.use(express.urlencoded({extended:false}));
instance.use(express.json());

instance.use(
    session({
        secret:'xyz007700zyx',
        resave: false, 
        saveUninitialized:true, 
        cookie:{
            maxAge:3600000 
        }
    })
);

let createobj = new create();

instance.post('/api/app/registerrole', createobj.newRole);
instance.post('/api/app/registeruser', createobj.newUser);
instance.post('/api/app/userinrole',createobj.newUserRole);
instance.post('/api/app/login',createobj.login);
instance.post('/api/app/logout',createobj.logout);

instance.post('/api/app/post',createobj.postData);

instance.get('/api/app/get',createobj.getData);

instance.delete('/api/app/delete/:id',createobj.deleteData);

instance.put('/api/app/put/:id',createobj.putData);


instance.listen(9080,()=>{
    console.log('Server Started on port 9080');
});
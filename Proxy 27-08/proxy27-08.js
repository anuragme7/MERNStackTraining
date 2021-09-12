class UserInfo {
    constructor(){
        this.firstName="Default-fName";
        this.lastName ="Default-lName";
        this.Email = "defaul-email@gmail.com";
        this._Secret  ="********"; 
        this.occupation = "default-occupation"; 
    }
}
const handler1={
    get(target, prop){
        let v = target[prop];
        return v;
    },
    set(target,prop,val){
       if(prop!=="Email"||(prop==="Email"&&val.endsWith('.co.in'))){
            target[prop] = val;
            return true;         
       } else {
           throw new Error('Sorry, only email ending with .co.in is supported');   
       }
    }
};
const handler2={
    get(target, prop){
        let v = target[prop];
        return v;
    },
    set(target,prop,val){
       if(prop!=="Email"||(prop==="Email"&&val.endsWith('.com'))){
            target[prop] = val;
            return true;         
       } else {
           throw new Error('Sorry, only email ending with .com is supported');
           
       }
    }
};
const handler3={
    get(target, prop){
        if(prop=="Email"||prop=="occupation"){
            throw new Error('Access is denied');
        }else{
            let v = target[prop];
            return v;
        }
    },
    set(target,prop,val){
       if(prop=="Email"||prop=="occupation"){
           throw new Error('Sorry, this property cannot be written');
       } else {
           target[prop] = val;
           return true;
       }
    }
};
const handler4={
    get(target, prop){
        let v = target[prop];
        return v;
    },
    set(target,prop,val){
       if(prop === '_Secret'){
           throw new Error('Sorry, this property cannot be written');
       } else {
           target[prop] = val;
           return true;
       }
    }
};
const proxy1 = new Proxy(new UserInfo(),handler1);
const proxy2=new Proxy(new UserInfo(),handler2);
const proxy3=new Proxy(new UserInfo(),handler3);
const proxy4=new Proxy(new UserInfo(),handler4);
function Consumer(proxy){ 
    console.log(`Before Change Consumer :`);
    console.log(`First Name ${proxy.firstName}`);
    console.log(`Last Name ${proxy.lastName}`); 
    console.log(`Email ${proxy.Email}`);  
    console.log(`_Secret ${proxy._Secret}`);
    console.log(`occupation ${proxy.occupation}`); 

    proxy.firstName = 'Anurag';
    proxy.lastName = "Mehta"; 
    proxy.occupation ="Service";
    proxy._Secret="****123****";
    //proxy1.Email="anuragmehta@gmail.com";
    proxy.Email="anuragmehta@gmail.co.in";
    console.log();
    console.log(`After Change Consumer :`);
    console.log(`First Name ${proxy.firstName}`);
    console.log(`Last Name ${proxy.lastName}`); 
    console.log(`Email ${proxy.Email}`);  
    console.log(`_Secret ${proxy._Secret}`);
    console.log(`occupation ${proxy.occupation}`);
    console.log();
}
try {
    Consumer(proxy1);
}catch(e) {
    console.log(e.message);
}
try {
    Consumer(proxy2);
}catch(e) {
    console.log(e.message);
}
try {
    Consumer(proxy3);
}catch(e) {
    console.log(e.message);
}
try {
    Consumer(proxy4);
}catch(e) {
    console.log(e.message);
}

// function Consumer2(){
//     console.log(`Before Change Consumer 2`);
//     console.log(`First Name ${proxy2.firstName}`);
//     console.log(`Last Name ${proxy2.lastName}`); 
//     console.log(`Email ${proxy2.Email}`);  
//     console.log(`_Secret ${proxy2._Secret}`);
//     console.log(`occupation ${proxy2.occupation}`); 

    
//     proxy2.firstName = 'Arun';
//     proxy2.lastName = "Parmar"; 
//     proxy2.occupation ="Business";
//     proxy2._Secret="****123****";
//     proxy2.Email="arunparmar@gmail.com";
//     //proxy2.Email="arunparmar@gmail.co.in";

//     console.log();
//     console.log(`After Change Consumer 2`);
//     console.log(`First Name ${proxy2.firstName}`);
//     console.log(`Last Name ${proxy2.lastName}`); 
//     console.log(`Email ${proxy2.Email}`);  
//     console.log(`_Secret ${proxy2._Secret}`);
//     console.log(`occupation ${proxy2.occupation}`);
// }

// function Consumer3(){
//     console.log(`Before Change Consumer 3`);
//     console.log(`First Name ${proxy3.firstName}`);
//     console.log(`Last Name ${proxy3.lastName}`); 
//    // console.log(`Email ${proxy3.Email}`);  
//     console.log(`_Secret ${proxy3._Secret}`);
//     //console.log(`occupation ${proxy3.occupation}`); 

//     proxy3.firstName = 'Dhawla';
//     proxy3.lastName = "Vaishnav"; 
//     //proxy3.occupation ="Service";
//     proxy3._Secret="****123****";
//    // proxy3.Email="dhawlavaishnav@gmail.com";
//    // proxy3.Email="dhawlavaishnav@gmail.co.in";

//     console.log();
//     console.log(`After Change Consumer 3`);
//     console.log(`First Name ${proxy3.firstName}`);
//     console.log(`Last Name ${proxy3.lastName}`); 
//     //console.log(`Email ${proxy3.Email}`);  
//     console.log(`_Secret ${proxy3._Secret}`);
//    // console.log(`occupation ${proxy3.occupation}`);
// }

// function Consumer4(){
//     console.log(`Before Change Consumer 4`);
//     console.log(`First Name ${proxy4.firstName}`);
//     console.log(`Last Name ${proxy4.lastName}`); 
//     console.log(`Email ${proxy4.Email}`);  
//     console.log(`_Secret ${proxy4._Secret}`);
//     console.log(`occupation ${proxy4.occupation}`); 

//     proxy4.firstName = 'Hardik';
//     proxy4.lastName = "Goswani"; 
//     proxy4.occupation ="Service";
//     //proxy4._Secret="****123****";
//     proxy4.Email="hardikgoswami@gmail.com";
//     proxy4.Email="hardikgoswami@gmail.co.in";

//     console.log();
//     console.log(`After Change Consumer 4`);
//     console.log(`First Name ${proxy4.firstName}`);
//     console.log(`Last Name ${proxy4.lastName}`); 
//     console.log(`Email ${proxy4.Email}`);  
//     console.log(`_Secret ${proxy4._Secret}`);
//     console.log(`occupation ${proxy4.occupation}`);
// }
// try {
//     Consumer1();
// }catch(e) {
//     console.log(e.message);
// }
// try {
//     Consumer2();
// }catch(e) {
//     console.log(e.message);
// }
// try {
//     Consumer3();
// }catch(e) {
//     console.log(e.message);
// }


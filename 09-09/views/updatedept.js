function putData(auth,prod,id) {
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();     
        http.onload = function () { 
            resolve(http.response); 
        };
        http.onerror = function (e) {
            reject(e); 
        };
        http.open(
            "PUT",
            `http://localhost:9081/api/departments/${id}`
        );
        http.setRequestHeader('Authorization',auth);
        http.setRequestHeader('Content-Type','application/json');    
        http.send(JSON.stringify(prod));
    });
}

function getData(auth,id) {
    return new Promise((resolve, reject) => {
        let http = new XMLHttpRequest();     
        http.onload = function () { 
            resolve(http.response); 
        };
        http.onerror = function (e) {
            reject(e); 
        };
        http.open(
            "GET",
            `http://localhost:9081/api/departments/${id}`
        );
        http.setRequestHeader('Authorization',auth);    
        http.send();
    });
}


window.onload=function(){
    
    let user=localStorage.getItem('Cred');
    if(user===undefined || user ===null){
        document.getElementById('out').innerHTML="Please Login!<br>Click Log Out to access the login page.";
        document.getElementById('cont').style.display="none";
    }
    else{
    let credentials = user.split(" ")[1];
    let username = credentials.split(":")[0]; 
    document.getElementById('logged').innerHTML=`Hi, ${username.charAt(0).toUpperCase()}${username.slice(1)} `;

    document.getElementById('clrbtn').addEventListener('click',function(){
        let clr=document.getElementsByName('clr');
        for(let i=0;i<clr.length;i++){
            clr[i].value="";
        }
    },false);
    let deptno=localStorage.getItem('Dept');
    let response=getData(user,deptno);
    response.then(function(resp){
        
            let prod=JSON.parse(resp);
            document.getElementById('deptno').value= deptno;
            document.getElementById('deptname').value=prod.rows.DeptName;
            document.getElementById('location').value=prod.rows.Location;
            document.getElementById('capacity').value=prod.rows.Capacity;
    }).catch(function(e){
        document.getElementById('msg').innerHTML = e;      
    });

    //document.getElementById('deptno').value=deptno;


    document.getElementById('sbtbtn').addEventListener('click',function(){
        let department={
          DeptNo: deptno,
          DeptName: document.getElementById('deptname').value,
          Location: document.getElementById('location').value,
          Capacity: parseInt(document.getElementById('capacity').value)
        };
        let auth = localStorage.getItem('Cred');
        let response=putData(auth,department,deptno);
        response.then(function(resp){
            console.log(resp);
            document.getElementById('msg').innerHTML = resp;
            document.getElementById('clrbtn').click();
            localStorage.removeItem('Dept');
        }).catch(function(e){
            document.getElementById('msg').innerHTML = e;      
        });
        
    },false);
    
    

    document.getElementById('prod').addEventListener('click',function(){
        localStorage.removeItem('Dept');
        document.getElementById('departments').click();
    },false);
    }
    document.getElementById('logout').addEventListener('click',function(){
        localStorage.clear();
        document.getElementById('Logoutbtn').click();
    },false);
}    
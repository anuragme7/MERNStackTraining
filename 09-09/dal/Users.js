class Users{
    #users=[];
    constructor(){
        this.#users = [
            {
                UserName:'anurag',
                Password:'mehta'
            },
            {
              UserName:'mahesh',
              Password:'sabnis'
            },
            {
              UserName:'arun',
              Password:'parmar'
            },
            {
              UserName:'harsh',
              Password:'patni'
            },
            {
              UserName:'admin',
              Password:'admin'
            }
          ];
    }
    validateUser(authHeader){
        console.log('In Validation');
        let credentials = authHeader.split(" ")[1];
        let userName = credentials.split(":")[0]; 
        let password = credentials.split(":")[1];
        for(let i=0;i<this.#users.length;i++){
            if(userName===this.#users[i].UserName){
                if(password===this.#users[i].Password){
                    return true;
                }
            }
        }
        return false;
    }
}

module.exports=Users;
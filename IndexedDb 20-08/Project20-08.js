var UIGenerator  = function() {
    function checkObjectsHasKeys(obj){
        var headers=[];      
        for(let p in obj){
            headers.push(p);
        }  
        return headers;
    }
    this.generateDropDown= function(datasource){
        if(datasource == undefined || datasource.length == 0) {
            return '<div> No data to show List </div>';
        } else {
            var selecr='';
            var opt='';
            if(typeof(datasource[0]) == 'string' || typeof(datasource[0])== 'number'){
                select = '<option disabled selected hidden></option>';
                opt="";
                for(var i=0;i<datasource.length;i++){
                    opt+='<option value="'+ datasource[i] + '">' + datasource[i] + '</option>';
                }
                select += opt;
                return select;
            }   
            else {
                if(checkObjectsHasKeys(datasource[0]).length >0) {
                    var headers = checkObjectsHasKeys(datasource[0]);
                    select = '<option disabled selected hidden></option>';
                    opt="";
                    for(var i=0;i<datasource.length;i++){
                        opt+='<option value="'+ datasource[i][headers[0]] + '">' + datasource[i][headers[1]] + '</option>';
                    }
                    select += opt;
                    return select;
                }   
            } 
        }
    }
};
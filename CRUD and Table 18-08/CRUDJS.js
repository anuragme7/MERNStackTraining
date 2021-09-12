var crud=function(){
    this.create=function(){
        var addtoTable={PerosnID:0,PerosnName:'',City:'',Age:0,Gender:''};
        addtoTable.PerosnID=document.getElementById('PersonID').value;
        addtoTable.PerosnName=document.getElementById('PersonName').value;
        addtoTable.Age=document.getElementById('Age').value;
        addtoTable.City=document.getElementById('City').value;
        addtoTable.Gender=document.getElementById('Gender').value;
        return addtoTable;
    };
    this.getdata=function(Persons,id){
        var check=0;
        for(var i=0;i<Persons.length;i++){
            if(id==Persons[i].PerosnID){
                document.getElementById('PersonName').value=Persons[i].PerosnName;
                document.getElementById('City').value=Persons[i].City;
                document.getElementById('Gender').value=Persons[i].Gender;
                document.getElementById('Age').value=Persons[i].Age;
                check=1;
                break;
            }
        }
        if(check==1) return true;
        else return false;

    }
    this.readall=function(Persons,Gender,City){
        if(Gender==''&&City==''){
            var headers = [];
            for(var p in Persons[0]){
                headers.push(p);
            }
            var i,j,h;
            var headerRow = '';
            for(i=0;i<headers.length;i++){
                headerRow+="<th>"+headers[i]+"</th>";
            }
            document.getElementById("thead").innerHTML = headerRow;
            var tableRow='';
            for(j=0;j<Persons.length;j++){
                var tr = '<tr>'
                for(h=0;h<headers.length;h++){
                    tr+='<td>'+ Persons[j][headers[h]] + '</td>';
                }
                tableRow+=tr;
            }
            document.getElementById('tbody').innerHTML = tableRow;
            //var check=0;
            // var out1='';
            // for(var i=0;i<Persons.length;i++){
            //         out1 += "Person-ID : "+Persons[i].PerosnID+" Person-Name : "+Persons[i].PerosnName+
            //             " City : "+Persons[i].City+" Age : "+Persons[i].Age+" Gender : "+Persons[i].Gender+"<br>";
            //         check=1;
            // }
            // if(check==1) document.getElementById(c).innerHTML="Records Found <br>"+out1;
            // else document.getElementById(c).innerHTML="No records Found";
        }
        

        if(Gender!=''&&City!=''){
            var headers = [];
            for(var p in Persons[0]){
                headers.push(p);
            }
            var i,j,h;
            var headerRow = '';
            for(i=0;i<headers.length;i++){
                headerRow+="<th>"+headers[i]+"</th>";
            }
            document.getElementById("thead").innerHTML = headerRow;
            var tableRow='';
            for(j=0;j<Persons.length;j++){
                var tr = '<tr>'
                for(h=0;h<headers.length;h++){
                if(City==Persons[j].City&&Gender==Persons[j].Gender){
                    tr+='<td>'+ Persons[j][headers[h]] + '</td>';
                }
                }
                tableRow+=tr;
            }
            document.getElementById('tbody').innerHTML = tableRow;
            // var check=0;
            // var out3='';
            // for(var i=0;i<Persons.length;i++){
            //     if(City==Persons[i].City&&Gender==Persons[i].Gender){
            //         out3 += "Person-ID : "+Persons[i].PerosnID+" Person-Name : "+Persons[i].PerosnName+
            //             " City : "+Persons[i].City+" Age : "+Persons[i].Age+" Gender : "+Persons[i].Gender+"<br>";
            //         check=1;
            //     }
            // }
            // if(check==1) document.getElementById('out1').innerHTML="Records Found <br>"+out3;
            // else document.getElementById('out1').innerHTML="No records Found";
            
        }
    };
    this.readid=function(Persons){
        // var id=document.getElementById('searchID').value;
        // var check=0;
        // var headers = [];
        // for(var p in Persons[0]){
        //     headers.push(p);
        // }
        // var i,j,h;
        // var headerRow = '';
        // for(i=0;i<headers.length;i++){
        //     headerRow+="<th>"+headers[i]+"</th>";
        // }
        // document.getElementById("thead").innerHTML = headerRow;
        // var tableRow='';
        // for(j=0;j<Persons.length;j++){
        //     var tr = '<tr>'
        //     for(h=0;h<headers.length;h++){
        //         if(id==Persons[j].PerosnID){
        //             check=1;
        //             tr+='<td>'+ Persons[j][headers[h]] + '</td>';
        //         }    
        //     }
        //     tableRow+=tr;
        // }
        //  if(check==1) document.getElementById('out1').innerHTML="Record Found <br>"+out2;
        // else document.getElementById('out1').innerHTML="No records Found";
        var id=document.getElementById('searchID').value;
        var check=0;
        var out2;
        for(var i=0;i<Persons.length;i++){
            if(id==Persons[i].PerosnID){
                out2="Person-ID : "+Persons[i].PerosnID+" Person-Name : "+Persons[i].PerosnName+
                     " City : "+Persons[i].City+" Age : "+Persons[i].Age+" Gender : "+Persons[i].Gender;
                check=1;
                break;
            }
        }
        if(check==1) document.getElementById('out2').innerHTML="Record Found <br>"+out2;
        else document.getElementById('out2').innerHTML="No records Found";
    };
    this.deleteid=function(c){
        var check1=0;
        for(var i=0;i<Persons.length;i++){
            console.log(Persons[i].PerosnID);
            console.log(c);
            if(Persons[i].PerosnID==c){
                Persons.splice(i,1);
                check1=1;
                break;
            }
        }
        if(check1==1) return true;
        else return false;
    };
    this.clear=function(){
        document.getElementById('PersonID').value="";
        document.getElementById('PersonName').value="";
        document.getElementById('City').value="";
        document.getElementById('Gender').value="";
        document.getElementById('Age').value="";
    };
};
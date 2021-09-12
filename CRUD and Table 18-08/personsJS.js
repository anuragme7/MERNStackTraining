function showTable(outtab){
    var headers = [];
    for(var p in outtab[0]){
        headers.push(p);
    }
    var i,j,h;
    var headerRow = '';
    for(i=0;i<headers.length;i++){
        headerRow+="<th>"+headers[i]+"</th>";
    }
    document.getElementById("thead").innerHTML = headerRow;
    var tableRow='';
    for(j=0;j<outtab.length;j++){
        var tr = '<tr>'
        for(h=0;h<headers.length;h++){
            tr+='<td>'+ outtab[j][headers[h]] + '</td>';
        }
        tableRow+=tr;
    }
    return tableRow;
}
function clear(){
    document.getElementById('PersonID').value="";
    document.getElementById('PersonName').value="";
    document.getElementById('City').value="";
    document.getElementById('Gender').value="";
}
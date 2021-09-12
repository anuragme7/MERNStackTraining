
function getF(Courses){
    var totalFees=0;
    var h=document.getElementsByName('courses');
    for(i=0;i<h.length;i++){
        if(h[i].checked){
            for(var j=0;j<Courses.length;j++){ 
                if(h[i].value==Courses[j]["coursename"]){
                    totalFees+=Courses[j]["Fees"];
                }
            }   
        }
    }
    document.getElementById('output').innerHTML="The Fees for the courses selected is "+totalFees;

}
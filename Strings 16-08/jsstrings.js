var str = "Indiana Jones is an American media franchise based on the adventures of Dr. Henry Walton 'Indiana' Jones, Jr., a fictional professor of archaeology, that began in 1981 with the film Raiders of the Lost Ark. In 1984, a prequel, The Temple of Doom, was released, and in 1989, a sequel, The Last Crusade. A fourth film followed in 2008, titled The Kingdom of the Crystal Skull. A fifth film is in production and is provisionally scheduled to be released in 2022. The series was created by George Lucas and stars Harrison Ford as Indiana Jones.";

function getIndexofChar(c){
    var count = [];
    for(var i=0;i<str.length;i++){
        if(str[i]==c.toLocaleLowerCase()||str[i]==c.toUpperCase()) count.push(i);
    }
    return count;
}

function getNoOfStatements(){
    var count = 0;
    for(var i=0;i<str.length;i++){
        if(str[i]=='.') count++;
    }
    return count;
}

function vowelCount(){
    var count = 0;
    var vowels=['a','A','e','E','i','I','o','O','u','U'];
    for(var i=0;i<str.length;i++){
        //simplify the hard coding by generalizing by putting them in a different array
        for(var j=0;j<vowels.length;j++){
            if(str[i]==vowels[j]){ 
                count++;
            }    
        }
    }
    return count;
}

function getCharCount(){
    return str.length;
}

function changeCase(c){
    if(c == 'U' || c == 'u') return str.toUpperCase();
    if(c == 'L' || c == 'l') return str.toLocaleLowerCase();
    return str;
  }
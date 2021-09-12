const http = require("http");

const emps = [
  { eno: 101, ename: "A", sal: 3100 },
  { eno: 102, ename: "B", sal: 3200 },
  { eno: 103, ename: "C", sal: 3300 },
  { eno: 104, ename: "D", sal: 3400 },
  { eno: 105, ename: "E", sal: 3500 },
];
 
const server = http.createServer((request, response) => {
  
  if(request.method === "GET"){
    let id = request.headers.id;
    if (id === undefined || id === 0) {
        // write a response Header
        response.writeHead(200, { "Content-Type": "application/json" });
        // write response data in header
        response.write(JSON.stringify(emps));
        // end the response
        response.end();
      } else {
            // write a response Header
        response.writeHead(200, {'Content-Type': 'application/json'});
        // write response data in header
        let res =  emps.filter((e,i)=> {return e.eno === parseInt(id);});
        console.log(`Data in Else ${JSON.stringify(res)}`)
        response.write(JSON.stringify(res));
        // end the response
        response.end();
      }
  }
  if(request.method === "POST") {
      // the global object for current request to save the received data
      let receivedData;
      request.on('data', (chunk)=>{
         // read data and store locally
         // wrte logic to validate the data, etc
         receivedData = JSON.parse(chunk);
      });
      // end the request and finally complete the processing
      request.on('end', ()=>{
          emps.push(receivedData);
          response.end(JSON.stringify(emps));
      });
  }
  
  if(request.method === "PUT") {
    // 1. Receive the id from the header
    let id = request.headers.id;
    if (id === undefined || id === 0) { 
      response.writeHead(400, { "Content-Type": "application/json" });
      response.write(JSON.stringify("Invalid ID"));
      response.end();
    }
    else{
      // 2. Search the Record from array based on the header
      
      let res=0;
      emps.forEach((rec,i)=> {
        if(rec.eno === parseInt(id)){
          // 3. if found then read data from the body using request.on()
          let receivedData;
          request.on('data', (chunk)=>{
            receivedData = JSON.parse(chunk);
          });
          // 4. Update the original data from array based on receibed data from body
          request.on('end', ()=>{
            console.log(receivedData);
            emps[i]=receivedData;
            //emps.push(receivedData);
            // 6. if data is successful the send the updated record back
            response.writeHead(200, { "Content-Type": "application/json" });
            response.write(JSON.stringify(emps[i]));
            response.end();
          });
          res=1;
          return;
        }
      });
      if(res==0){
        // 5. if based on id data is not found generate error response e.g. not found
        response.writeHead(404, { "Content-Type": "application/json" });
        response.write(JSON.stringify("ID Not Found"));
        response.end();
      }   
    }

}
  
if(request.method === "DELETE") {
    // 1. Receive the id from the header
    let id = request.headers.id;
    if (id === undefined || id === 0) { 
      response.writeHead(400, { "Content-Type": "application/json" });
      response.write(JSON.stringify("Invalid ID"));
      response.end();
    }
    else{
      // 2. Search the Record from array based on the header
      let res=0;
      emps.forEach((rec,i)=> {
        if(rec.eno === parseInt(id)){
          // 3. if found then delete from  the array and generate response
          emps.splice(i,1);
          res=1;
          response.writeHead(200, { "Content-Type": "application/json" });
          response.write(JSON.stringify("ID Deleted"));
          response.end();
          return;
        }
      });
      // 4. if based on id data is not found generate error response e.g. not found
      if(res==0){
        response.writeHead(404, { "Content-Type": "application/json" });
        response.write(JSON.stringify("ID Not Found"));
        response.end();
      }
      
      
    } 
}
   
  
});

// start listening on a port
server.listen(9080);
console.log("STarted listening on port 9080");

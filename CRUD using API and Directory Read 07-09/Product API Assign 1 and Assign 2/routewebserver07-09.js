const http = require("http");
const fs = require("fs");
const path = require("path");

const serverPath = path.join(__dirname, "./../views");
let x,check=0;
const server = http.createServer((req, resp) => {
  check=0;
  let y=req.url;
  fs.readdir(serverPath, (err, files) => {
    if (err) {
      console.log('error in readdir');
      return;
    }
    files.forEach((file, i) => {
      x=`/${file.slice(0,file.lastIndexOf('.'))}`;
      if(y===x){
        check=1;
        fs.readFile(
          `${serverPath}/${file}`,
          { encoding: "ascii" },
          (error, file1) => {
            if (error) {
              resp.writeHead(404, { "Content-Type": "text/html" });
              resp.write(`File Not Found ${error.message}`);
              resp.end();
            }
            resp.writeHead(200, { "Content-Type": "text/html" });
            resp.write(file1);
            resp.end();
          }
        );
      } 
    });
    if(check==0){
      resp.writeHead(200, { "Content-Type": "text/html" });
      resp.write('Please check the URL');
      resp.end();
    }
  });
});

server.listen(9080);
console.log("Started on 9080");

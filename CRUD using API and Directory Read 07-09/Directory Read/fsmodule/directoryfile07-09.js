const fs = require("fs");
const path = require("path");
const dirPath = path.join(__dirname, "./../files1");

// REad the directory and list all files

fs.readdir(dirPath, (err, files) => {
  if (err) {
    return;
  }

  files.forEach((file, i) => {
    fs.stat(`${dirPath}/${file}`, (err, stat) => {
      if (err) {
        console.log(`Some Error ${err.message}`);
        return;
      }
      if(stat.isFile()) {
          console.log(file);
          
          console.log(`Data From File is = ${fs.readFileSync(`${dirPath}/${file}`)}`);
      }
      else{
        if(stat.isDirectory()){
            fs.readdir(`${dirPath}/${file}`, (err, files1) => {
            if (err) {
              console.log(`The error inside subfolder = ${err.message}`);
              return;
            }
            files1.forEach((file1, i) => {
              fs.stat(`${dirPath}/${file}/${file1}`, (err, stat) => {
                if (err) {
                  console.log(`Some Error ${err.message}`);
                  return;
                }
                if(stat.isFile()) {
                    console.log(`${file}/${file1}`);

                    console.log(`Data From File is = ${fs.readFileSync(`${dirPath}/${file}/${file1}`)}`);
                }
              });
            });
          });
        }
      }
    });
  });
});

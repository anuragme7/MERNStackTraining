"use strict";

var patientOP = function patientOP() {
  var _this = this;

  var map = new Map();

  this.getRecordsInArray = function () {
    var arr = [];
    map.forEach(function (val, key) {
      arr.push(val);
    });
    return arr;
  };

  this.setPatientId = function () {
    var sizeofcurrmap = map.size;
    document.getElementById('PatientId').value = "PID-000".concat(sizeofcurrmap + 1);
  };

  this.saveData = function () {
    var pid = document.getElementById('PatientId').value;
    var pname = document.getElementById('PatientName').value;
    var dname = document.getElementById('DoctorName').value;
    var age = document.getElementById('Age').value;
    var dis = document.getElementById('disease').value;
    var gen = document.getElementById('gender').value;
    var war = document.getElementById('ward').value;
    var obj = {
      PatientId: pid,
      PatientName: pname,
      DoctorName: dname,
      Age: age,
      Disease: dis,
      Gender: gen,
      Ward: war
    };
    map.set(pid, obj);

    _this.setPatientId();
  };

  this.loadData = function () {
    map.forEach(function (val, key) {
      console.log("Value at Key = ".concat(JSON.stringify(key), " is = ").concat(JSON.stringify(val)));
    });
  };

  this.getRecords = function (cate) {
    //cate can be doctorname, disease or ward
    if (map.size == 0) {
      document.getElementById('out').innerHTML = "No Records to Show.";
    } else {
      var recinarray = _this.getRecordsInArray();

      var ans = recinarray.reduce(function (pat, obj) {
        var check = obj[cate];

        if (!pat[check]) {
          pat[check] = [];
        }

        pat[check].push(obj);
        return pat;
      }, {});
      var doctors = [];
      var y, i, j;
      var table = "";

      for (y in ans) {
        table = "".concat(table, "Category Name : ").concat(y);
        table = "".concat(table, " <table style=\"border: 1px dashed;\">");
        table = "".concat(table, " <thead id=\"h").concat(y, "\">");
        table = "".concat(table, " </thead >");
        doctors.push(y);
        table = "".concat(table, " <tbody id=\"b").concat(y, "\">");
        table = "".concat(table, " </tbody >");
        table = "".concat(table, " </table>");
      }

      document.getElementById('out').innerHTML = table; // console.log(ans[doctors[0]]);

      var headers = [];
      var tablehead = "";
      var tablerow = ""; //console.log(ans[doctors[0]]);

      for (y in ans) {
        tablehead = "";

        for (i = 0; i < ans[doctors[0]].length; i++) {
          headers = [];

          for (var z in ans[y][0]) {
            headers.push(z);
            tablehead = "".concat(tablehead, "<th>").concat(z, "</th>");
          }

          break;
        }

        document.getElementById("h".concat(y)).innerHTML = tablehead;
      } // console.log(headers);
      // console.log(ans[doctors[0]].length);


      for (y in ans) {
        tablerow = "";

        for (i = 0; i < ans[y].length; i++) {
          //console.log(ans[y][i]);
          tablerow = "".concat(tablerow, " <tr>");

          for (j = 0; j < headers.length; j++) {
            tablerow = "".concat(tablerow, "<td>").concat(ans[y][i][headers[j]], "</td>"); // tablerow+="<td>"+ans[y][i][headers[j]]+"</td>";
          }

          tablerow = "".concat(tablerow, " </tr>");
        }

        document.getElementById("b".concat(y)).innerHTML = tablerow;
      }
    } // console.log(JSON.stringify(ans));

  };
};

"use strict";

var UIGenerator = function UIGenerator() {
  function checkObjectsHasKeys(obj) {
    var headers = [];

    for (var p in obj) {
      headers.push(p);
    }

    return headers;
  }

  this.generateDropDown = function (datasource) {
    if (datasource == undefined || datasource.length == 0) {
      return '<div> No data to show List </div>';
    } else {
      var select = '';
      var opt = '';

      if (typeof datasource[0] == 'string' || typeof datasource[0] == 'number') {
        // select = `<select name="form" id= " ${sid} ">`;
        select = "".concat(select, " <option disabled selected hidden></option>");
        opt = "";

        for (var i = 0; i < datasource.length; i++) {
          opt = "".concat(opt, " <option value=\"").concat(datasource[i], "\"> ").concat(datasource[i], " </option>");
        }

        select = "".concat(select, " ").concat(opt, " ");
        return select;
      } else {
        if (checkObjectsHasKeys(datasource[0]).length > 0) {
          var headers = checkObjectsHasKeys(datasource[0]); // select = `<select name="form" id= " ${sid} "></select>`;

          select = "".concat(select, " <option disabled selected hidden></option>");
          opt = "";

          for (var _i = 0; _i < datasource.length; _i++) {
            opt = "".concat(opt, " <option value=\"").concat(datasource[_i][headers[0]], "\"> ").concat(datasource[_i][headers[1]], " </option>");
          }

          select = "".concat(select, " ").concat(opt, " ");
          return select;
        }
      }
    }
  };
};

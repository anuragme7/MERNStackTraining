"use strict";

var checkValid = function checkValid() {
  this.check = function () {
    var c = document.getElementsByName('form');
    var count = 0;

    for (var i = 0; i < c.length; i++) {
      if (c[i].checkValidity()) {
        c[i].style.border = "2px solid green";
        count++;
      } else {
        c[i].style.border = "2px solid red";
      }
    }

    if (count == c.length) return true;else return false;
  };
};

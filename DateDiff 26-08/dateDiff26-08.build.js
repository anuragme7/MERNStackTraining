"use strict";

var dateop = function dateop() {
  var _this = this;

  this.getdaysinmonth = function (mon, year) {
    if (mon == 1 || mon == 3 || mon == 5 || mon == 7 || mon == 8 || mon == 10 || mon == 12) {
      return 31;
    }

    if (mon == 4 || mon == 6 || mon == 9 || mon == 11) {
      return 30;
    }

    if (mon == 2 && year % 4 == 0 && year % 100 != 0 || year % 400 == 0) {
      return 29;
    }

    if (mon == 1 && (year % 4 != 0 || year % 100 == 0)) {
      return 28;
    }
  };

  this.getans = function () {
    var d1 = document.getElementById('d1').value;
    var d2 = document.getElementById('d2').value;
    var year1 = 0,
        year2 = 0,
        date1 = 0,
        date2 = 0,
        month1 = 0,
        month2 = 0,
        h1 = 0,
        m1 = 0,
        h2 = 0,
        m2 = 0;
    var t1 = document.getElementById('t1').value;
    var t2 = document.getElementById('t2').value;
    var diffy = 0,
        diffd = 0,
        diffmo = 0,
        diffh = 0,
        diffm = 0;
    year1 = parseInt(d1.slice(0, 4));
    year2 = parseInt(d2.slice(0, 4));
    month1 = parseInt(d1.slice(5, 7));
    month2 = parseInt(d2.slice(5, 7));
    var tmonth1 = month1;
    var tyear1 = year1;
    date1 = parseInt(d1.slice(8));
    date2 = parseInt(d2.slice(8));
    h1 = parseInt(t1.slice(0, 2));
    h2 = parseInt(t2.slice(0, 2));
    m1 = parseInt(t1.slice(3));
    m2 = parseInt(t2.slice(3));
    var dobj1 = new Date("".concat(month1, "/").concat(date1, "/").concat(year1, " ").concat(h1, ":").concat(m1));
    var dobj2 = new Date("".concat(month2, "/").concat(date2, "/").concat(year2, " ").concat(h2, ":").concat(m2));
    console.log(dobj1);
    console.log(dobj2);
    var diff = Math.abs(dobj2 - dobj1);
    console.log(diff);
    var diffs = Math.floor(diff / 1000);
    var diffseconds = diffs;
    diffm = Math.floor(diffs / 60);
    diffs = diffs % 60;
    diffh = Math.floor(diffm / 60);
    diffm = diffm % 60;
    diffd = Math.floor(diffh / 24);
    diffh = diffh % 24;
    var check = true;
    var currmonthdiff = 0;

    if (tmonth1 == month2 && tyear1 == year2) {
      diffmo = 0;
      check = false;
    } else {
      currmonthdiff = _this.getdaysinmonth(month1, year1) - date1;

      if (tmonth1 == 12) {
        tmonth1 = 1;
        tyear1++;
      } else {
        tmonth1++;
      }
    }

    while (tmonth1 < month2 || tyear1 < year2) {
      var subtractdays = _this.getdaysinmonth(tmonth1, tyear1);

      diffd = diffd - subtractdays;
      diffmo++;
      console.log("Month difference " + tmonth1);

      if (tmonth1 == 12) {
        tmonth1 = 1;
        tyear1++;
      } else {
        tmonth1++;
      }

      if (diffmo == 12) {
        diffmo = 0;
        diffy++;
      }
    }

    if (check) {
      currmonthdiff = currmonthdiff + date2;

      if (h1 > h2) {
        currmonthdiff--;
      } else if (h1 == h2 && t1 > t2) {
        currmonthdiff--;
      }

      if (currmonthdiff >= _this.getdaysinmonth(month2, year2)) {
        diffmo++;

        if (diffmo == 12) {
          diffmo = 0;
          diffy++;
        }

        currmonthdiff = currmonthdiff - _this.getdaysinmonth(month2, year2);
      }

      diffd = currmonthdiff;
    }

    document.getElementById('ans').innerHTML = "The difference between From Date and To Date is\n        ".concat(diffy, "years ").concat(diffmo, "months ").concat(diffd, "days ").concat(diffh, "hours ").concat(diffm, "minutes ").concat(diffs, "seconds");
  };
};

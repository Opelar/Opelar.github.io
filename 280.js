(function (win) {
  var $ = function (selector) {
    return document.getElementById(selector);
  };

  var dateF = function (num) {
    return num = num < 10 ? ("0" + num) : num;
  }

  var add = function (d) {
    d.setDate(d.getDate() + 280);
    var y = d.getFullYear();
    var m = d.getMonth() + 1;
    var day = d.getDate();

    return y + "-" + dateF(m) + "-" + dateF(day);
  }

  var start = $("start");

  start.addEventListener(
    "change",
    function () {
      var startTime = $("start").value;
      var utc = new Date(startTime);
      $("start_p").value = startTime;
      $("end").innerHTML = add(utc);
    },
    false
  );
})(window)

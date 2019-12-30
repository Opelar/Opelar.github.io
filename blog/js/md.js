
var whenReady = (function () {
  var funcs = [];
  var ready = false;

  function handler(e) {
    if (ready) return;

    if (e.type === "readystatechange" && document.readyState !== "complete") {
      return;
    }

    for (var i = 0; i < funcs.length; i++) {
      funcs[i].call(document);
    }

    ready = true;
    funcs = null;
  }

  if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", handler, false);
    document.addEventListener("readystatechange", handler, false);
    window.addEventListener("load", handler, false);
  }
  else if (document.attachEvent) {
    document.attachEvent("onreadystatechange", handler);
    window.attachEvent("onload", handler);
  }

  return function whenReady(f) {
    if (ready) {
      f.call(document);
    } else {
      funcs.push(f);
    }
  }
}());

whenReady(function () {
  var container = document.createElement('div')
  var bodyInnerHTML = document.body.innerHTML;

  container.innerHTML = bodyInnerHTML;

  document.documentElement.style.margin = '0';
  document.documentElement.style.padding = '0';
  document.body.style.margin = '0';
  document.body.style.padding = '0';

  container.style.margin = '0 auto';
  container.style.maxWidth = '800px';
  container.style.padding = '10px 20px 30px';
  container.style.backgroundColor = "#f5f5f5";

  document.body.innerHTML = null;
  document.body.appendChild(container)
})

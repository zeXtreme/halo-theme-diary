var spy = function () {
  var elems = document.querySelectorAll(Array.from(Array(6).keys(), x => ".post-body h"+(x+1).toString()));
  if (elems.length == 0) {
    return;
  }
  var currentTop = window.pageYOffset !== undefined ? window.pageYOffset :
    ((document.compatMode || "") === "CSS1Compat") ? document.documentElement.scrollTop : document.body.scrollTop;

  var meetUnread = false;
  let lastElemName = elems[elems.length - 1].id;
  elems.forEach(function (elem, idx) {
    var elemTop = elem.offsetTop;
    var id = elem.getAttribute('id');
    var navElems = document.getElementsByClassName("nav-"+id);
    if (navElems.length == 0) return;
    if (currentTop >= elemTop) {
      Array.from(navElems).forEach((e) => e.classList.add('toc-active'));
    } else {
      if (!meetUnread) {
        meetUnread = true;
        if (idx > 0) lastElemName = elems[idx - 1].id;
      }
      Array.from(navElems).forEach((e) => e.classList.remove('toc-active'));
    }
  });
  document.querySelectorAll(".nav-" + lastElemName).forEach(e => {
    e.scrollIntoView({ block: "center", behavior: 'smooth' });
  });
}

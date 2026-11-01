(function(){
  const depth = Number(document.body.getAttribute("data-nav-depth") || "0");
  const prefix = depth === 2 ? "../../" : (depth === 1 ? "../" : "");
  const courseHome = prefix + "index.html";
  const ITEMS = [
    { code: "3A", title: "Functions and function notation", href: "Chapter%203%20Functions%20and%20graphs/3A-functions-and-function-notation/concept.html", ready: true },
    { code: "3B", title: "Functions, relations, and graphs", href: "Chapter%203%20Functions%20and%20graphs/3B-functions-relations-and-graphs/concept.html", ready: true },
    { code: "3C", title: "Review of linear graphs", href: "Chapter%203%20Functions%20and%20graphs/3C-review-of-linear-graphs/concept.html", ready: true },
    { code: "3D", title: "Quadratic functions — factoring and the graph", href: "Chapter%203%20Functions%20and%20graphs/3D-quadratic-functions-factoring-and-the-graph/concept.html", ready: true },
    { code: "3E", title: "Completing the square and the graph", href: "Chapter%203%20Functions%20and%20graphs/3E-completing-the-square-and-the-graph/concept.html", ready: true },
    { code: "3F", title: "The quadratic formulae and the graph", href: "Chapter%203%20Functions%20and%20graphs/3F-the-quadratic-formulae-and-the-graph/concept.html", ready: true },
    { code: "3G", title: "Powers, cubics, and circles", href: "Chapter%203%20Functions%20and%20graphs/3G-powers-cubics-and-circles/concept.html", ready: true },
    { code: "3H", title: "Two graphs that have asymptotes", href: "Chapter%203%20Functions%20and%20graphs/3H-two-graphs-that-have-asymptotes/concept.html", ready: true },
    { code: "3I", title: "Direct and inverse variation", href: "Chapter%203%20Functions%20and%20graphs/3I-direct-and-inverse-variation/concept.html", ready: true }
  ];
  const current = document.body.getAttribute("data-section") || "";
  function el(tag, attrs, html){
    const n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function(k){
      if (attrs[k] != null && attrs[k] !== false) n.setAttribute(k, attrs[k]);
    });
    if (html) n.innerHTML = html;
    return n;
  }
  const nav = el("nav", { class: "chapter-nav", id: "chapter-nav", "aria-label": "Course path" });
  nav.appendChild(el("p", { class: "nav-kicker" }, "Year 11 · Bridging course"));
  nav.appendChild(el("h2", { class: "nav-title" }, "Course path"));
  nav.appendChild(el("p", { class: "nav-sub" }, "Chapter 3 · Concept → Tutorial → Exercise"));
  const list = el("ul", { class: "nav-list" });
  const homeLi = el("li", { class: "nav-item" });
  homeLi.appendChild(el("a", { class: "nav-row", href: courseHome }, '<span class="code">Map</span><span class="label">Course home</span>'));
  list.appendChild(homeLi);
  ITEMS.forEach(function(it){
    const li = el("li", { class: "nav-item" + (it.code === current ? " is-current" : "") });
    if (it.ready) {
      li.appendChild(el("a", {
        class: "nav-row" + (it.code === current ? " is-active" : ""),
        href: prefix + it.href
      }, '<span class="code">' + it.code + '</span><span class="label">' + it.title + '</span>'));
    } else {
      li.appendChild(el("div", { class: "nav-row", style: "opacity:.45;cursor:default" },
        '<span class="code">' + it.code + '</span><span class="label">' + it.title + '</span>'));
    }
    list.appendChild(li);
  });
  nav.appendChild(list);
  nav.appendChild(el("p", { class: "nav-sub" }, '<a href="' + courseHome + '" style="color:#e8d7a8">← Course home</a>'));
  let shell = document.querySelector(".shell");
  if (!shell) {
    shell = el("div", { class: "shell" });
    const main = el("div", { class: "main" });
    while (document.body.firstChild) main.appendChild(document.body.firstChild);
    shell.appendChild(main);
    document.body.appendChild(shell);
  }
  shell.insertBefore(nav, shell.querySelector(".main") || shell.firstChild);
  const SCROLL_KEY = "mdaa-y11bridge-nav-scroll";
  try {
    const saved = sessionStorage.getItem(SCROLL_KEY);
    if (saved != null) nav.scrollTop = Number(saved) || 0;
    else {
      const active = nav.querySelector(".nav-row.is-active, .nav-item.is-current");
      if (active) active.scrollIntoView({ block: "center" });
    }
  } catch (e) {}
  nav.addEventListener("scroll", function(){
    try { sessionStorage.setItem(SCROLL_KEY, String(nav.scrollTop)); } catch (e) {}
  }, { passive: true });
})();

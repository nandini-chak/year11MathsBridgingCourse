/* Per-part Show/Hide worked solutions (see per-part-solution-buttons skill). */
(function () {
  function labelFromButton(btn) {
    var t = (btn.textContent || "").replace(/^\s*(Show|Hide)\s+solution(?:\s*·\s*|\s+)/i, "").trim();
    return t || "";
  }

  function setOpen(btn, sol, on) {
    sol.classList.toggle("open", on);
    btn.setAttribute("aria-expanded", on ? "true" : "false");
    var lab = labelFromButton(btn);
    var base = lab ? "solution · " + lab : "worked solution";
    btn.textContent = (on ? "Hide " : "Show ") + base;
  }

  function pairs() {
    var out = [];
    document.querySelectorAll(".q-part").forEach(function (part) {
      var btn = part.querySelector(":scope > button.show");
      var sol = part.querySelector(":scope > .sol");
      if (btn && sol) out.push({ btn: btn, sol: sol });
    });
    /* Legacy: one button + one .sol directly under article.q */
    document.querySelectorAll("article.q").forEach(function (art) {
      if (art.querySelector(".q-part")) return;
      var btn = art.querySelector(":scope > button.show");
      var sol = art.querySelector(":scope > .sol");
      if (btn && sol) out.push({ btn: btn, sol: sol });
    });
    return out;
  }

  function bind() {
    if (document.body.getAttribute("data-sol-bound")) return;
    document.body.setAttribute("data-sol-bound", "1");
    pairs().forEach(function (p) {
      p.btn.addEventListener("click", function () {
        setOpen(p.btn, p.sol, !p.sol.classList.contains("open"));
      });
    });
    var on = document.getElementById("allOn");
    var off = document.getElementById("allOff");
    if (on)
      on.onclick = function () {
        pairs().forEach(function (p) {
          setOpen(p.btn, p.sol, true);
        });
      };
    if (off)
      off.onclick = function () {
        pairs().forEach(function (p) {
          setOpen(p.btn, p.sol, false);
        });
      };
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bind);
  } else {
    bind();
  }
  window.MDAA_bindSolutions = bind;
})();

/* Render .tex with KaTeX. A chain of equals (two or more “=”) becomes
   a left-aligned aligned block, one step per line. */
(function () {
  function splitTopLevelEquals(src) {
    var parts = [];
    var buf = "";
    var depth = 0;
    for (var i = 0; i < src.length; i++) {
      var c = src[i];
      if (c === "\\") {
        buf += c;
        if (i + 1 < src.length) buf += src[++i];
        continue;
      }
      if (c === "{") depth++;
      else if (c === "}") depth = Math.max(0, depth - 1);
      else if (c === "=" && depth === 0) {
        parts.push(buf.trim());
        buf = "";
        continue;
      }
      buf += c;
    }
    parts.push(buf.trim());
    return parts.filter(function (p) { return p.length > 0; });
  }

  function toAligned(src) {
    if (src.indexOf("\\begin") >= 0) return null;
    var parts = splitTopLevelEquals(src);
    if (parts.length < 3) return null;
    var lines = parts[0] + " &= " + parts[1];
    for (var j = 2; j < parts.length; j++) lines += " \\\\ &= " + parts[j];
    return "\\begin{aligned}" + lines + "\\end{aligned}";
  }

  function hasContent(node) {
    if (!node) return false;
    if ((node.textContent || "").replace(/\s+/g, "").length > 0) return true;
    return !!node.querySelector && !!node.querySelector("*");
  }

  function liftChain(span, aligned) {
    var parent = span.parentElement;
    var block = document.createElement("div");
    block.className = "eq-steps";
    block.setAttribute("data-texed", "1");
    katex.render(aligned, block, { throwOnError: false, displayMode: true });
    if (!parent || parent.tagName !== "P") {
      span.replaceWith(block);
      return;
    }
    var before = document.createElement("p");
    var after = document.createElement("p");
    before.className = parent.className;
    after.className = parent.className;
    var seen = false;
    Array.prototype.slice.call(parent.childNodes).forEach(function (child) {
      if (child === span) {
        seen = true;
        return;
      }
      (seen ? after : before).appendChild(child);
    });
    if (after.firstChild && after.firstChild.nodeType === 3) {
      after.firstChild.textContent = after.firstChild.textContent.replace(/^\s*\.\s*/, "");
    }
    if (before.lastChild && before.lastChild.nodeType === 3) {
      before.lastChild.textContent = before.lastChild.textContent.replace(/\s+$/, "");
    }
    var frag = document.createDocumentFragment();
    if (hasContent(before)) frag.appendChild(before);
    frag.appendChild(block);
    if (hasContent(after)) frag.appendChild(after);
    parent.replaceWith(frag);
  }

  function texAll() {
    if (!window.katex) return;
    var nodes = Array.prototype.slice.call(document.querySelectorAll(".tex"));
    nodes.forEach(function (n) {
      if (n.getAttribute("data-texed")) return;
      if (!n.isConnected) return;
      var raw = (n.textContent || "").trim();
      if (!raw) return;
      var aligned = toAligned(raw);
      if (aligned) {
        n.setAttribute("data-texed", "1");
        liftChain(n, aligned);
        return;
      }
      n.setAttribute("data-texed", "1");
      katex.render(raw, n, { throwOnError: false, displayMode: n.classList.contains("display") });
    });
  }

  function boot() {
    if (window.katex) texAll();
    else setTimeout(boot, 80);
  }
  window.MDAA_texAll = texAll;
  window.addEventListener("load", boot);
  setTimeout(boot, 300);
})();

(function () {
  const USER = "nc";
  const PASS = "23082006";
  const KEY = "mdaa-y11bridge-auth";
  function signedIn(){ try { return sessionStorage.getItem(KEY) === "1"; } catch(e){ return false; } }
  if (signedIn()) return;
  document.documentElement.classList.add("auth-locked");
  const sub = document.body.getAttribute("data-auth-sub") || "Year 11 Mathematics · Bridging course";
  function build(){
    const gate = document.createElement("div");
    gate.className = "auth-gate";
    gate.innerHTML =
      '<form class="auth-card" autocomplete="off">' +
      '<p class="auth-school">My Dream Australian Academy</p>' +
      '<h1>Year 11 Mathematics · Bridging</h1>' +
      '<p class="auth-sub">' + sub + '</p>' +
      '<label for="auth-user">User</label>' +
      '<input id="auth-user" type="text" autocapitalize="none" spellcheck="false" required />' +
      '<label for="auth-pass">Password</label>' +
      '<input id="auth-pass" type="password" required />' +
      '<p class="auth-error" role="alert" hidden>That user and password do not match.</p>' +
      '<button class="btn" type="submit">Sign in</button></form>' +
      '<p class="auth-credit">Created by Nandini C</p>';
    document.body.appendChild(gate);
    const form = gate.querySelector("form");
    const user = gate.querySelector("#auth-user");
    const pass = gate.querySelector("#auth-pass");
    const error = gate.querySelector(".auth-error");
    user.focus();
    form.addEventListener("submit", function(e){
      e.preventDefault();
      if (user.value.trim().toLowerCase() === USER && pass.value === PASS) {
        try { sessionStorage.setItem(KEY, "1"); } catch(err){}
        document.documentElement.classList.remove("auth-locked");
        gate.remove();
        window.dispatchEvent(new Event("resize"));
        return;
      }
      error.removeAttribute("hidden");
      pass.value = "";
      pass.focus();
    });
  }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", build);
  else build();
})();

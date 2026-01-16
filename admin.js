const LOGIN_KEY = "execurive_admin_logged";

/* ELEMENT SAFE LOAD */
const $ = id => document.getElementById(id);

const loginBox = $("loginBox");
const panel = $("panel");
const fake404 = $("fake404");

/* INIT */
document.addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem(LOGIN_KEY)){
    showPanel();
  }else{
    showLogin();
  }

  $("loginBtn").onclick = login;
  $("logoutBtn").onclick = logout;
  $("saveBtn").onclick = generate;
});

/* HASH SHA-256 */
function hash(v){
  return CryptoJS.SHA256(v).toString();
}

/* LOGIN */
function login(){
  const u = $("user").value.trim();
  const p = $("pass").value;

  if(!u || !p){
    alert("Username & password wajib diisi");
    return;
  }

  fetch("data/admin.json")
    .then(r => {
      if(!r.ok) throw "admin.json missing";
      return r.json();
    })
    .then(d => {
      const hp = hash(p);
      const ok = d.users.find(x => x.username === u && x.password === hp);

      if(ok){
        localStorage.setItem(LOGIN_KEY,"1");
        showPanel();
      }else{
        alert("Login gagal");
      }
    })
    .catch(err=>{
      alert("Admin system error");
      console.error(err);
    });
}

/* SHOW LOGIN */
function showLogin(){
  fake404.style.display = "none";
  panel.classList.add("hidden");
  loginBox.classList.remove("hidden");
}

/* SHOW PANEL */
function showPanel(){
  fake404.style.display = "none";
  loginBox.classList.add("hidden");
  panel.classList.remove("hidden");
  loadServer();
}

/* LOGOUT → FAKE 404 */
function logout(){
  localStorage.removeItem(LOGIN_KEY);
  panel.classList.add("hidden");
  loginBox.classList.add("hidden");
  fake404.style.display = "block";
}

/* LOAD SERVER DATA */
function loadServer(){
  fetch("data/server.json")
    .then(r => r.ok ? r.json() : {})
    .then(d => {
      $("status").value = d.status || "OFFLINE";
      $("players").value = d.players ?? 0;
      $("maxPlayers").value = d.maxPlayers ?? 0;
      $("peak").value = d.peak ?? 0;
      $("gamemode").value = d.gamemode || "";
      $("ip").value = d.ip || "";
    });
}

/* GENERATE JSON */
function generate(){
  const data = {
    status: $("status").value,
    players: Number($("players").value) || 0,
    maxPlayers: Number($("maxPlayers").value) || 0,
    peak: Number($("peak").value) || 0,
    gamemode: $("gamemode").value || "",
    ip: $("ip").value || "",
    updated: new Date().toLocaleString("id-ID")
  };

  const blob = new Blob(
    [JSON.stringify(data,null,2)],
    {type:"application/json"}
  );

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "server.json";
  a.click();
}

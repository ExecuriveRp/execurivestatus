const KEY = "execurive_admin_login";

/* INIT */
if(localStorage.getItem(KEY)){
  showPanel();
}else{
  showLogin();
}

/* HASH SHA-256 */
function hash(v){
  return CryptoJS.SHA256(v).toString();
}

/* LOGIN */
function login(){
  const u = user.value.trim();
  const p = pass.value;

  fetch("data/admin.json")
    .then(r=>r.json())
    .then(d=>{
      const hp = hash(p);
      const ok = d.users.find(x=>x.username===u && x.password===hp);
      if(ok){
        localStorage.setItem(KEY,"1");
        showPanel();
      }else{
        alert("Login gagal");
      }
    })
    .catch(()=>{
      alert("admin.json not found");
    });
}

/* SHOW LOGIN */
function showLogin(){
  fake404.style.display="none";
  loginBox.classList.remove("hidden");
}

/* SHOW PANEL */
function showPanel(){
  fake404.style.display="none";
  loginBox.classList.add("hidden");
  panel.classList.remove("hidden");
  loadServer();
}

/* FAKE 404 */
function logout(){
  localStorage.removeItem(KEY);
  panel.classList.add("hidden");
  fake404.style.display="block";
}

/* LOAD SERVER */
function loadServer(){
  fetch("data/server.json")
    .then(r=>r.json())
    .then(d=>{
      status.value=d.status;
      players.value=d.players;
      maxPlayers.value=d.maxPlayers;
      peak.value=d.peak;
      gamemode.value=d.gamemode;
      ip.value=d.ip;
    });
}

/* GENERATE */
function generate(){
  const data={
    status:status.value,
    players:+players.value,
    maxPlayers:+maxPlayers.value,
    peak:+peak.value,
    gamemode:gamemode.value,
    ip:ip.value,
    updated:new Date().toLocaleString("id-ID")
  };

  const blob=new Blob([JSON.stringify(data,null,2)],{type:"application/json"});
  const a=document.createElement("a");
  a.href=URL.createObjectURL(blob);
  a.download="server.json";
  a.click();
}

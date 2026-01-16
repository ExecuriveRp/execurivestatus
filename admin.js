const LOGIN_KEY = "execurive_admin_login";

/* AUTO LOGIN */
if(localStorage.getItem(LOGIN_KEY)){
  showPanel();
}

/* HASH */
function hash(str){
  return CryptoJS.MD5(str).toString();
}

/* LOGIN */
function login(){
  const u = document.getElementById("user").value.trim();
  const p = document.getElementById("pass").value;

  if(!u || !p){
    alert("Lengkapi username & password");
    return;
  }

  fetch("data/admin.json")
    .then(r=>r.json())
    .then(d=>{
      const hp = hash(p);
      const ok = d.users.find(x => x.username === u && x.password === hp);

      if(ok){
        localStorage.setItem(LOGIN_KEY,"1");
        showPanel();
      }else{
        alert("Login gagal");
      }
    })
    .catch(()=>{
      alert("admin.json tidak ditemukan");
    });
}

/* SHOW PANEL */
function showPanel(){
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("panel").classList.remove("hidden");
  loadServer();
}

/* LOGOUT */
function logout(){
  localStorage.removeItem(LOGIN_KEY);
  location.reload();
}

/* LOAD SERVER DATA */
function loadServer(){
  fetch("data/server.json")
    .then(r=>r.json())
    .then(d=>{
      status.value = d.status || "OFFLINE";
      players.value = d.players || 0;
      maxPlayers.value = d.maxPlayers || 0;
      peak.value = d.peak || 0;
      gamemode.value = d.gamemode || "";
      ip.value = d.ip || "";
    });
}

/* GENERATE JSON */
function generate(){
  const data = {
    status: status.value,
    players: Number(players.value),
    maxPlayers: Number(maxPlayers.value),
    peak: Number(peak.value),
    gamemode: gamemode.value,
    ip: ip.value,
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

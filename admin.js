async function login(){
  const u = document.getElementById("username").value.trim()
  const p = document.getElementById("password").value

  try{
    const r = await fetch("data/admin.json?v="+Date.now())
    const d = await r.json()

    const h = CryptoJS.SHA256(p).toString()

    console.log("USER:", u)
    console.log("HASH:", h)
    console.log("DATA:", d)

    const ok = d.users.find(x => x.username === u && x.password === h)

    if(!ok){
      alert("Login gagal")
      return
    }

    localStorage.setItem("adminLogin","1")
    location.href = "panel.html"

  }catch(e){
    alert("Error load admin")
    console.error(e)
  }
}

async function login(){
  const u = document.getElementById("username").value.trim()
  const p = document.getElementById("password").value

  if(!u || !p){
    alert("Username / password kosong")
    return
  }

  try{
    const res = await fetch("data/admin.json?v=" + Date.now())
    const data = await res.json()

    const hash = CryptoJS.SHA256(p).toString()

    const user = data.users.find(x =>
      x.username === u && x.password === hash
    )

    if(!user){
      alert("Username atau password salah")
      return
    }

    localStorage.setItem("adminLogin","true")
    location.href = "panel.html"

  }catch(e){
    alert("Gagal load admin.json")
    console.error(e)
  }
}

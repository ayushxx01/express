   function switchTab(tab) {
  const isLogin = tab === 'login';
 
  document.querySelectorAll('.tab-btn').forEach((btn, i) => {
    btn.classList.toggle('active', isLogin ? i === 0 : i === 1);
  });
 
  document.getElementById('login-form').classList.toggle('active', isLogin);
  document.getElementById('register-form').classList.toggle('active', !isLogin);
 
  // Clear errors on tab switch
  document.getElementById('login-error').classList.remove('visible');
  document.getElementById('register-error').classList.remove('visible');
}
 
function showError(id, message) {
  const el = document.getElementById(id);
  el.textContent = message;
  el.classList.add('visible');
}
 


// ------------------- Login Logic -----------------



const loggin = async () =>{
    console.log("login function called")
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();

    if(!email || !password){
        alert("All fields are mandatory")
        return;
    }

    const response = await fetch("http://localhost:2341/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
        
    });

    const data = await response.json();
    console.log(data);
    localStorage.setItem("token", data.token);
    window.location.href = "notes.html";
}
document.getElementById("login-btn").addEventListener('click', loggin);

const register = async () =>{
    console.log("register function called");
    const username = document.getElementById("register-username").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value.trim();
    
    if(!username || !email || !password){
        alert("All fields are mandatory")
        return;
    }

    const response = await fetch("http://localhost:2341/user/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, email, password })
        
    });

    const data = await response.json();
    console.log(data);
}

document.getElementById("register-btn").addEventListener('click', register);
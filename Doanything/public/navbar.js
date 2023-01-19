
let navBarHTML = /* html */ `
<div class="header d-f">
<div class="menuContainer">
    <i id="navMenuBtn" class="fa-sharp fa-solid fa-bars"></i>
    <a href="../index.html"><img src="../image/logo-sample.png"></a>
    <div class="navMenu">
        <ul>
            <a href="/profile/profile.html"><li><i class="fa-solid fa-user"></i>用戶資料</li></a>
            <a href="/jobList/jobList.html"><li><i class="fa-solid fa-magnifying-glass"></i>搜索工作</li></a>
            <a href="/employer/newPost.html"><li><i class="fa-regular fa-paste"></i>發佈工作</li></a>
            <a href="/jobManage/index.html"><li><i class="fa-solid fa-list-check"></i>我的工作</li></a>
            <a href="/bookmark"><li><i class="fa-solid fa-bookmark"></i>我的收藏</li></a>
        </ul>
    </div>
</div>
<div id="jobBtn">
    <a href="/jobList/jobList.html">搜索工作</a>
    <a href="/employer/newPost.html">發佈工作</a>
    <a href="#">關於我們</a>
</div>
<div id="userBtn">
    <a href="/login">登入</a>
    <a href="/signup">註冊</a>
</div>
<div id="userInfo">
    <img id = "user_img" src="https://cdn-icons-png.flaticon.com/512/149/149071.png">
    <p id="headerUsername">Hi, {username}</p>
    <button id="logout">登出</button>
</div>
</div>
`;

let navbar = document.createRange().createContextualFragment(navBarHTML);
document.body.prepend(navbar);

let navMenu = document.querySelector(".navMenu");
navMenu.style.display = "none";

let navBtn = document.querySelector("#navMenuBtn");

if (navBtn) {
  navBtn.addEventListener("click", () => {
    navMenu.style.display == "none"
      ? (navMenu.style.display = "block")
      : (navMenu.style.display = "none");
  });
}

// user and register change
let registerTemplate = document.querySelector('#userBtn')
let userTemplate = document.querySelector('#userInfo')

async function checkSession() {
    let res = await fetch('/user');
    if(!res.ok) {
      let message = await res.text()
      console.log(message);
      return
    }
    res = await res.json()
    
    if(res) {
      console.log(res)
        userTemplate.style.display = 'flex'
        registerTemplate.style.display = 'none'
        document.querySelector('#headerUsername').textContent = 'Hi, ' + res.nickname
        if(res.profile_image) {
          document.querySelector('#user_img').src = `/userupload/${res.profile_image}` 
        }
    } else {
        userTemplate.style.display = 'none'
        registerTemplate.style.display = 'flex'
    }
}
checkSession()

document.querySelector("#logout").addEventListener('click' , async function (event){
    let res = await fetch('/logout', {method: 'POST'});
 console.log(res);
    if(!res.ok){
    res.status(500);
    res.end("logout failed");
    return
 }
 checkSession();
 
    window.location('/')
  })
// logout function
let logoutBtn = document.querySelector('#logout')

async function logout() {
    console.log('this is logout function');
    let res = await fetch('/logout', {
      method:'post'
    })
    if(!res.ok) {
        let message = await res.text()
        console.log('error:' + message);
        return
    }
    checkSession()
    window.location = ("/")
}

logoutBtn.addEventListener('click', logout);

// to top function start
let toTopBtn = document.querySelector('.toTopBtn')

if(toTopBtn) {
  toTopBtn.style.display = 'none'
  toTopBtn.addEventListener('click', topFunction)
  window.onscroll = () => {
    scrollFunction()
  };
}

function scrollFunction() {
  if(window.scrollY > 50) {
    toTopBtn.style.display = 'block'
  } else {
    toTopBtn.style.display = 'none'
  }
}

function topFunction() {
  window.scrollTo({top: 0, behavior: 'smooth'});
}


// to top function end


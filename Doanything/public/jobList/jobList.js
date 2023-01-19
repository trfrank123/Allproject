let jobCardList = document.querySelector(".jobContainer");
let jobCard = document.querySelector(".jobCard");
jobCard.remove();

let urlParams = new URLSearchParams(window.location.search);
let keyword = urlParams.get("keyword");
// let locationArea = urlParams.get("location");
let skillBtnList = document.querySelector(".skillBtn");
let categoryList = document.querySelector(".categoryBtn");
let locationList = document.querySelector(".locationBtn");
let minInput = document.querySelector('#min');
let maxInput = document.querySelector('#max');
let sorting = document.querySelector('#sorting')

console.log(document.body.clientHeight);


if (urlParams.has("keyword")) {
  loadJob(`/search?keyword=${keyword}`);
  // loadJob(`/search?keyword=${keyword}&location=${locationArea}`);
} else {
  filterSearch()
}

// make the search input get the URL keyword
document.getElementById('searchInput').value = keyword

function changeURL() {
  window.location.href=`/jobList/jobList.html?keyword=${document.getElementById('searchInput').value}`
}


function formatDate(date) {
  return date.slice(0, 10) + " " + date.slice(11, 19);
}

async function getUserId() {
  let res = await fetch("/user");
  if (!res.ok) {
    return;
  }
  res = await res.json();
  return res.id;
}

async function loadJob(src) {
  clearJob()
  let res = await fetch(src);
  let userId = await getUserId();

  if (!res.ok) {
    let message = await res.text();
    console.log("failed to load job list:" + message);
    emergencyList.textContent = "暫時沒有工作";
    return;
  }

  let json = await res.json();

  for (let job of json.jobs) {
    let node = jobCard.cloneNode(true);
    node.id = job.id;

    //bookmark 
    if(userId) {
      let bookmarks = await fetch('/bookmark/' + userId)
      let bookmark_json = await bookmarks.json()

      for(let bookmark of bookmark_json) {
        if(bookmark.id === job.id) {
          node.querySelector('.bookmarkBtn').innerHTML = '<i id="bookmark_solid" class="fa-solid fa-heart"></i>'
        }
      }
    }

    if(job.category_name === 'normal') {
      node.style.borderTop = '5px solid #F2AC57'
    } else if(job.category_name === 'urgent') {
      node.style.borderTop = '5px solid #FF7171'
    } else {
      node.style.borderTop = '5px solid #0E263E'
    }
    
    node.querySelector("#title").textContent = job.title;
    node.querySelector("#skill").textContent = job.skill_name;
    node.querySelector("#location").textContent = job.location;
    node.querySelector("#deadline").textContent = formatDate(job.deadline);
    node.querySelector("#reward").textContent = "$ " + job.reward;
    node.querySelector("#detail").innerHTML = JSON.parse(job.detail).content;;
    node.querySelector('#area').textContent = job.location_area

    jobCardList.appendChild(node);
  }
}

async function getDetail(event) {
  let jobId = await event.currentTarget.parentNode.id
  if(jobId) {
    window.location = `/jobDetail/jobDetail.html?jobId=${jobId}`;
  }
}

// multiple filter start
// load filter btn
async function loadFilterBtn(path, filterListName) {
  let res = await fetch(path);

  if (!res.ok) {
    let message = await res.text();
    console.log("failed to load:" + message);
    return;
  }

  let json = await res.json();

  for (let filter of json) {
    switch (filter.type) {
      case "normal":
        filter.type = "一般";
        break;
      case "urgent":
        filter.type = "緊急";
        break;
      case "infinite":
        filter.type = "無限期";
        break;
      default:
        break;
    }

    switch (filter.area) {
      case "HK":
        filter.area = "香港島";
        break;
      case "NT":
        filter.area = "新界";
        break;
      case "KL":
        filter.area = "九龍";
        break;
      case "home":
        filter.area = "在家工作";
        break;
      default:
        break;
    }
    
    let button = document.createElement("li");
    switch (filter.type) {
      case 'photography':
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12L18 6H30L33 12H15Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linejoin="round"/><rect x="4" y="12" width="40" height="30" rx="3" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linejoin="round"/><path d="M24 35C28.4183 35 32 31.4183 32 27C32 22.5817 28.4183 19 24 19C19.5817 19 16 22.5817 16 27C16 31.4183 19.5817 35 24 35Z" fill="#ff9b21" stroke="#FFF" stroke-width="3" stroke-linejoin="round"/></svg>
        <p>攝影</p>
        </div>
        `
        break;
      case 'teaching':
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6V42H30V6H4Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 42V6" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 6H36V38L40 42L44 38V6Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 12H44" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 6H4" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 42H4" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 6V22" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 6V22" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <p>教學/教育</p>
        </div>
        `
        break;
      case 'cleaning':
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 5.91406H28V13.9141H43V21.9141H5V13.9141H20V5.91406Z" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40H40V22H8V40Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linejoin="round"/><path d="M16 39.8976V33.9141" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 39.8977V33.8977" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 39.8976V33.9141" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 40H36" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <p>清潔</p>
        </div>
        `
        break;
      case 'cooking':
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 42L42 42" stroke="#333" stroke-width="3" stroke-linecap="round"/><path d="M6 36L42 36" stroke="#333" stroke-width="3" stroke-linecap="round"/><path d="M9 25C9 16.7157 15.7157 10 24 10C32.2843 10 39 16.7157 39 25V36H9L9 25Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 25V29" stroke="#FFF" stroke-width="3" stroke-linecap="round"/><path d="M28 10V8C28 5.79086 26.2091 4 24 4V4C21.7909 4 20 5.79086 20 8V10" stroke="#333" stroke-width="3"/></svg>
        <p>煮食</p>
        </div>
        `
        break;
      case 'shopping':
        button.innerHTML =`
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 17H43L38.8 43H9.2L5 17Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M35 17C35 10.3726 30.0751 5 24 5C17.9249 5 13 10.3726 13 17" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="17" cy="26" r="2" fill="#FFF"/><path d="M18 33C18 33 20 36 24 36C28 36 30 33 30 33" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="31" cy="26" r="2" fill="#FFF"/></svg>
        <p>代買</p>
        </div>
        `
        break;
      case 'finding':
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linejoin="round"/><path d="M26.657 14.3431C25.2093 12.8954 23.2093 12 21.0001 12C18.791 12 16.791 12.8954 15.3433 14.3431" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M33.2216 33.2217L41.7069 41.707" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <p>尋人/寵物</p>
        </div>
        `
        break;
      case 'repairing':
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.4417 5C32.406 5 34.265 5.44776 35.9207 6.24607L32.7172 9.42668C30.8706 11.2601 30.8706 14.2327 32.7172 16.0661C34.5638 17.8995 37.5578 17.8995 39.4044 16.0661L42.2571 13.2337C42.7379 14.5558 43 15.9818 43 17.4685C43 24.3547 37.3775 29.937 30.4417 29.937C28.7825 29.937 27.1985 29.6176 25.7486 29.0373L13.07 41.6253C11.2238 43.4582 8.2307 43.4582 6.38459 41.6253C4.53847 39.7924 4.53847 36.8207 6.38459 34.9877L18.9523 22.5099C18.2651 20.9684 17.8834 19.2627 17.8834 17.4685C17.8834 10.5823 23.5059 5 30.4417 5Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linejoin="round"/></svg>
        <p>維修</p>
        </div>
        `
        break;
      case 'programming':
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="32" width="10" height="9" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="5" y="8" width="38" height="24" rx="2" fill="#E48F27" stroke="#333" stroke-width="3"/><path d="M22 27H26" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 41L34 41" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>        <p>網頁/APP開發</p>
        </div>
        `
        break;
      default:
        button.textContent = filter.type ? filter.type : filter.area;
        break;
    }

    button.dataset.id = filter.id;
    button.onclick = () => {
      button.classList.toggle("active");
      filterSearch();
    };
    filterListName.appendChild(button);
  }
}
loadFilterBtn("/filter/skills", skillBtnList);
loadFilterBtn("/filter/categories", categoryList);
loadFilterBtn("/filter/locations", locationList);

// filter and sorting search function
maxInput.addEventListener('change', ()=>{
  filterSearch()
})

minInput.addEventListener('change', ()=>{
  filterSearch()
})

sorting.addEventListener('change', ()=>{
  filterSearch()
})

async function filterSearch() {
  clearJob();
  let params = new URLSearchParams();
  let userId = await getUserId();  

  skillBtnList.querySelectorAll(".active").forEach((btn) => {
    params.append("skill_id", btn.dataset.id);
  });

  categoryList.querySelectorAll(".active").forEach((btn) => {
    params.append("category_id", btn.dataset.id);
  });

  locationList.querySelectorAll(".active").forEach((btn) => {
    params.append("location_area_id", btn.dataset.id);
  });

  if(minInput.value) {
    params.append("min_reward", minInput.value)
  }
  if(maxInput.value) {
    params.append("max_reward", maxInput.value)
  }

  //sorting function part
  if(sorting.value != 'default') {
    params.append("sorting_method", sorting.value)
  }

  let url = "/filter?" + params;
  console.log(url);

  let res = await fetch(url);

  if (!res.ok) {
    let message = await res.text();
    console.log("failed to load job list:" + message);
    listName.textContent = "暫時沒有此類工作";
    return;
  }

  let json = await res.json();

  for (let job of json) {
    let node = jobCard.cloneNode(true);
    node.id = job.id;

    if (userId == job.post_user_id) {
      node.querySelector('.applyBtn').style.display = 'none'
    }

    //bookmark 
    if(userId) {
      let bookmarks = await fetch('/bookmark/' + userId)
      let bookmark_json = await bookmarks.json()

      for(let bookmark of bookmark_json) {
        if(bookmark.id === job.id) {
          node.querySelector('.bookmarkBtn').innerHTML = '<i id="bookmark_solid" class="fa-solid fa-heart"></i>'
        }
      }
    }

    switch (job.location_area) {
      case "HK":
        job.location_area = "香港島";
        break;
      case "NT":
        job.location_area = "新界";
        break;
      case "KL":
        job.location_area = "九龍";
        break;
      case "home":
        job.location_area = "在家工作";
        break;
      default:
        break;
    }

    switch (job.skill_name) {
      case 'photography':
        job.skill_name = '攝影'
        break;
      case 'finding':
        job.skill_name = '搜尋'
        break;
      case 'cleaning':
        job.skill_name = '清潔'
        break;
      case 'teaching':
        job.skill_name = '教學'
        break;
      case 'cooking':
        job.skill_name = '煮食'
        break;
      case 'shopping':
        job.skill_name = '代買'
        break;
      case 'repairing':
        job.skill_name = '維修'
        break;
      case 'programming':
        job.skill_name = '編寫程式'
        break;
      default:
        break;
    }

    if(job.category_name === 'normal') {
      node.style.borderTop = '5px solid #F2AC57'
    } else if(job.category_name === 'urgent') {
      node.style.borderTop = '5px solid #FF7171'
    } else {
      node.style.borderTop = '5px solid #0E263E'
    }

    node.querySelector("#title").textContent = job.title;
    node.querySelector("#skill").textContent = job.skill_name;
    node.querySelector("#location").textContent = job.location;
    node.querySelector("#deadline").textContent = formatDate(job.deadline);
    node.querySelector("#reward").textContent = "$ " + job.reward;
    node.querySelector("#detail").innerHTML = JSON.parse(job.detail).content;
    node.querySelector("#area").textContent = job.location_area;

    jobCardList.appendChild(node);
  }
}

//clear filter function
function clearFilter(filterListName) {
  filterListName.querySelectorAll('.active').forEach((btn)=>{
    btn.classList.remove('active');
  })
}

// clear job list function
function clearJob() {
  jobCardList.innerHTML = "";
}

// reset button
document.querySelector("#resetBtn").addEventListener("click", () => {
  clearFilter(skillBtnList);
  clearFilter(categoryList);
  clearFilter(locationList);
  maxInput.value = undefined;
  minInput.value = undefined;
  sorting.value = 'default'
  document.getElementById('searchInput').value = ''
  filterSearch();
});

// multiple filter end

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})

//accept job from freelancer
async function applyJob(event) {
  let userId = await getUserId();
  let requestId = event.target.parentNode.id

  let obj = {
    userId: userId,
    requestId: requestId
  }

  if(!obj.userId) {
    Swal.fire({
      icon: 'warning',
      text: '請先登入!',
    }).then(()=>{
      window.location = "/login";
    })
  }

  let res = await fetch(`/accept`, {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(obj),
  });

  if (!res.ok) {
    let message = await res.text();
    console.log("failed to accept job:" + message);
    if (message === "Already accept this job!") {
      Toast.fire({
        icon: 'warning',
        title: '已接受此工作！',
      })
    } else if (message === "Error: user no found in session!") {
      Swal.fire({
        icon: 'warning',
        text: '請先登入!',
      }).then(()=>{
        window.location = "/login";
      })
    }
    return;
  }

  Swal.fire({
    icon: 'success',
    text: '成功接受此工作！',
  }).then(()=>{
    window.location = "/jobManage/index.html";
  })
}

// add job to bookmark
let bookmarkBtn = jobCard.querySelector('.bookmarkBtn')

async function handleBookmark(event) {
  let userId = await getUserId();
  let requestId = event.target.parentNode.parentNode.id
  let obj = {
    userId: userId,
    requestId: requestId
  }

  if(event.target.id == 'bookmark_regular') {
    // add job to bookmark
    console.log('calling add bookmark api');
    let res = await fetch('/bookmark', {
      method:'post',
      headers: { "Content-type": "application/json" },
      body:JSON.stringify(obj)
    })
    
    if (!res.ok) {
        let message = await res.text();
        console.log("failed to accept job:" + message);
        if(message === 'Error: user no found in session!') {
          Swal.fire({
            icon: 'warning',
            text: '請先登入!',
          }).then(()=>{
            window.location = "/login";
          })
        }
        return;
    }
    event.target.parentNode.innerHTML = '<i id="bookmark_solid" class="fa-solid fa-heart"></i>'
    Toast.fire({
      icon: 'success',
      title: '成功加入收藏夾!',
    })

  } else if(event.target.id == 'bookmark_solid'){
    // delete job from bookmark
    console.log('calling delete bookmark api');
    let res = await fetch('/bookmark', {
      method:'delete',
      headers: { "Content-type": "application/json" },
      body:JSON.stringify(obj)
    })
    
    if (!res.ok) {
      let message = await res.text();
      console.log("failed to accept job:" + message);
      if(message === 'Error: user no found in session!') {
        Swal.fire({
          icon: 'warning',
          text: '請先登入!',
        }).then(()=>{
          window.location = "/login";
        })
      }
      return;
    }
    
    event.target.parentNode.innerHTML = '<i id="bookmark_regular" class="fa-regular fa-heart"></i>'
    Toast.fire({
      icon: 'success',
      title: '成功取消收藏!',
    })
  }
}


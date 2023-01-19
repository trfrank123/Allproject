let jobList = document.querySelector('.jobContainer')
let jobCard = document.querySelector('.jobCard')
let bookmarkBtn = document.querySelector('#bookmarkBtn')
jobCard.remove()

const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
})

async function getUserId() {
    let res = await fetch('/user');
    if (!res.ok) {
        let message = await res.text()
        console.log(message);
        return
    }
    res = await res.json()
    return res.id
}

async function checkSession() {
    let userId = await getUserId()
    if (userId) {
        loadBookmark()
    } else {
        Swal.fire({
            icon: 'warning',
            text: '請先登入!',
        }).then(()=>{
            window.location = "/login";
        })
        return
    }
}
checkSession()

function loadJobCard(json) {
    for (let job of json) {
        let node = jobCard.cloneNode(true)
        node.id = job.id

        function formatDate(date) {
            return date.slice(0, 10) + ' ' + date.slice(11, 19);
        }

        if(job.category_name === 'normal') {
            node.style.borderTop = '5px solid #F2AC57'
          } else if(job.category_name === 'urgent') {
            node.style.borderTop = '5px solid #FF7171'
          } else {
            node.style.borderTop = '5px solid #0E263E'
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

        node.querySelector("#title").textContent = job.title;
        node.querySelector("#skill").textContent = job.skill_name;
        node.querySelector("#location").textContent = job.location;
        node.querySelector("#deadline").textContent = formatDate(job.deadline);
        node.querySelector("#reward").textContent = "$ " + job.reward;
        node.querySelector("#detail").innerHTML = JSON.parse(job.detail).content;
        node.querySelector("#area").textContent = job.location_area;
    
        jobList.appendChild(node)
    }
}

// Load bookmark job
async function loadBookmark() {
    let userId = await getUserId()
    if(userId) {
        let res = await fetch('/bookmark/' + userId)

        if (!res.ok) {
            let message = await res.text()
            console.log('failed to load book mark:' + message);
            return
        }
    
        let json = await res.json()
        console.log(json);
        jobList.textContent = ''
    
        loadJobCard(json)
    }
}
loadBookmark()

async function getDetail(event) {
  let jobId = await event.currentTarget.parentNode.id
  if(jobId) {
    window.location = `/jobDetail/jobDetail.html?jobId=${jobId}`;
  }
}

async function deleteBookmark(event) {
    let userId = await getUserId()
    let requestId = event.target.parentNode.parentNode.id

    let obj = {
        userId: userId,
        requestId: requestId
    }

    let res = await fetch('/bookmark', {
        method:'delete',
        headers: { "Content-type": "application/json" },
        body:JSON.stringify(obj)
      })

    if(!res.ok) {
        let message = await res.text()
        console.log('failed to load book mark:' + message);
        return
    }

    event.target.parentNode.innerHTML = '<i id="bookmark_regular" class="fa-regular fa-heart"></i>'
    Toast.fire({
        icon: 'success',
        title: '已取消收藏!',
    })
    loadBookmark()
}

async function applyJob(event) {
    let userId = await getUserId();
    let requestId = event.target.parentNode.id
  
    let obj = {
      userId: userId,
      requestId: requestId
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

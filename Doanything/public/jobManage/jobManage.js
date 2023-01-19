let jobList = document.querySelector(".jobCardContainer");
let jobCard = document.querySelector(".jobCardDetail");
// jobCard.remove();

let jobStatus;

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

//get user id
async function getUserId() {
  let res = await fetch("/user");
  if (!res.ok) {
    let message = await res.text();
    console.log(message);
    return;
  }
  res = await res.json();
  return res.id;
}

// check is loggedIn or not if yes load the job, if not route to login page
async function checkSession() {
  let userId = await getUserId();
  // console.log(userId);
  if (userId) {
    loadFreelanceJob("applied");
    loadJobNumber("waiting", true);
    loadJobNumber("accepted", true);
    loadJobNumber("completed", true);
    loadJobNumber("applied", false);
    loadJobNumber("confirmed", false);
    loadJobNumber("completed", false);
  } else {
    window.location = "/login";
    return;
  }
}
checkSession();

//load freelancer job
async function loadFreelanceJob(jobStatus) {
  let userId = await getUserId();
  let res = await fetch("/freelancer/" + userId + "/" + jobStatus);

  let json = await res.json();
  console.log(json.length);


  // TODO wrong title
  if (!res.ok) {
    let message = await res.text();
    console.log("failed to load job list:" + message);

    switch (jobStatus) {
      case "applied":
        jobList.textContent = "沒有想接的工作";
        break;
      case "confirmed":
        jobList.textContent = "沒有已確認工作";
        break;
      case "completed":
        jobList.textContent = "沒有已完成工作";
        break;
      default:
        break;
    }
    return;
  }

  // let json = await res.json();
  jobList.textContent = "";
  jobStatus = jobStatus;

  for (let job of json) {
    let node = jobCard.cloneNode(true);
    node.id = job.request_id;

    switch (job.category_name) {
      case "normal":
        job.category_name = "一般";
        break;
      case "urgent":
        job.category_name = "緊急";
        break;
      case "infinite":
        job.category_name = "無限期";
        break;
      default:
        break;
    }

    function formatDate(date) {
      return date.slice(0, 10) + " " + date.slice(11, 19);
    }

    node.querySelector("#title").innerHTML = `<h3 id="title"><a href="http://localhost:8080/jobDetail/jobDetail.html?jobId=${node.id}">${job.title}</a></h3>`
    // console.log(node.querySelector("#title").innerHTML)

    // node.querySelector("#title").textContent = job.title;
    node.querySelector("#category").textContent = job.category_name;
    node.querySelector("#startTime").textContent = formatDate(job.start_time);
    node.querySelector("#deadline").textContent = formatDate(job.deadline);

    switch (job.skill_name) {
      case "photography":
        job.skill_name = "攝影";
        break;
      case "teaching":
        job.skill_name = "教學/教育";
        break;
      case "cleaning":
        job.skill_name = "清潔";
        break;
      case "cooking":
        job.skill_name = "煮食";
        break;
      case "shopping":
        job.skill_name = "代買";
        break;
      case "finding":
        job.skill_name = "尋人/寵物";
        break;
      case "repairing":
        job.skill_name = "維修";
        break;
      case "programming":
        job.skill_name = "網頁/APP開發";
        break;
      default:
        job.skill_name="";
        break;
    }

    node.querySelector("#skill").textContent = job.skill_name;
    switch (job.area) {
      case "HK":
        job.area = "香港島";
        break;
      case "NT":
        job.area = "新界";
        break;
      case "KL":
        job.area = "九龍";
        break;
      case "home":
        job.area = "在家工作";
        break;
      default:
        job.area = "";
        break;
    }
    node.querySelector("#location").textContent = job.area;
    node.querySelector("#reward").textContent = "$" + job.reward;

    node.querySelector("#detail").innerHTML = JSON.parse(job.detail).content;
    node.querySelector("#acceptBtn").style.display = "none";
    node.querySelector("#completeBtn").style.display = "none";

    if (!job.image) {
      node.querySelector("#image").textContent = `沒有其他附加圖片`;
    } else {
      node.querySelector(
        "#image"
      ).innerHTML = `<img src=../request_uploads/${job.image}></img>`;
    }

    // when job status is confirmed or completed hide the cancel button
    if (jobStatus == "applied") {
      node.querySelector("#cancelBtn").style.display = "inline";
    } else if (jobStatus == "confirmed" || "completed") {
      node.querySelector("#cancelBtn").style.display = "none";
    }

    jobList.appendChild(node);
  }
}

//load employer job
async function loadEmployerJob(jobStatus) {
  let employerUserId = await getUserId();

  let res = await fetch("/employer/" + employerUserId + "/" + jobStatus);

  if (!res.ok) {
    let message = await res.text();
    console.log("failed to load job list:" + message);

    switch (jobStatus) {
      case "waiting":
        jobList.textContent = "沒有發出任何工作";
        break;
      case "accepted":
        jobList.textContent = "沒有正進行工作";
        break;
      case "completed":
        jobList.textContent = "沒有已完成工作";
      default:
        break;
    }
    return;
  }

  let json = await res.json();
  console.log(json)
  jobList.textContent = "";

  for (let job of json.employer_id) {
    let node = jobCard.cloneNode(true);
    node.id = job.id;

    switch (job.category_name) {
      case "normal":
        job.category_name = "一般";
        break;
      case "urgent":
        job.category_name = "緊急";
        break;
      case "infinite":
        job.category_name = "無限期";
        break;
      default:
        break;
    }

    function formatDate(date) {
      let result = date.slice(0, 10) + " " + date.slice(11, 19);
      return result;
    }
    node.querySelector("#title").innerHTML = `<h3 id="title"><a href="http://localhost:8080/jobDetail/jobDetail.html?jobId=${node.id}">${job.title}</a></h3>`

    // node.querySelector("#title").textContent = job.title;
    node.querySelector("#category").textContent = job.category_name;
    node.querySelector("#startTime").textContent = formatDate(job.start_time);
    node.querySelector("#deadline").textContent = formatDate(job.deadline);
    
    switch (job.skill_name) {
      case "photography":
        job.skill_name = "攝影";
        break;
      case "teaching":
        job.skill_name = "教學/教育";
        break;
      case "cleaning":
        job.skill_name = "清潔";
        break;
      case "cooking":
        job.skill_name = "煮食";
        break;
      case "shopping":
        job.skill_name = "代買";
        break;
      case "finding":
        job.skill_name = "尋人/寵物";
        break;
      case "repairing":
        job.skill_name = "維修";
        break;
      case "programming":
        job.skill_name = "網頁/APP開發";
        break;
      default:
        job.skill_name="";
        break;
    }
    node.querySelector("#skill").textContent = job.skill_name;
    switch (job.area) {
      case "HK":
        job.area = "香港島";
        break;
      case "NT":
        job.area = "新界";
        break;
      case "KL":
        job.area = "九龍";
        break;
      case "home":
        job.area = "在家工作";
        break;
      default:
        job.area = "";
        break;
    }
    node.querySelector("#location").textContent = job.area;
    node.querySelector("#reward").textContent = "$" + job.reward;
    node.querySelector("#detail").innerHTML = JSON.parse(job.detail).content;
    node.querySelector("#acceptBtn").style.display = "none";
    node.querySelector("#completeBtn").style.display = "none";

    if (!job.image) {
      node.querySelector("#image").textContent = `沒有其他附加圖片`;
    } else {
      node.querySelector(
        "#image"
      ).innerHTML = `<img src=../request_uploads/${job.image}></img>`;
    }

    // only employer choose job page, will show the choose freelancer function
    if (jobStatus === "waiting") {
      findAppliedFreelancer(node.id);
      node.querySelector("#freelancer-list").style.display = "block";
    }

    // only working  job need to show the complete button
    if (jobStatus === "accepted") {
      node.querySelector("#completeBtn").style.display = "inline";
    }

    if (jobStatus == "waiting") {
      node.querySelector("#cancelBtn").style.display = "inline";
    } else if (jobStatus == "accepted" || "completed") {
      node.querySelector("#cancelBtn").style.display = "none";
    }

    jobList.appendChild(node);
  }
}

// cancel job
async function cancelJob(event) {
  let requestId = parseInt(event.currentTarget.parentNode.parentNode.id);
  let userId = await getUserId();
  let employerRes = await fetch(`/jobs/${requestId}`)
  let employer = await employerRes.json()
  let obj = {
    requestId: requestId,
    userId: userId,
  };
  let path

  if(userId == employer.job_id[0].employer_id) {
    path = '/employerCancel'
  } else {
    path = '/cancel'
  }

  let res = await fetch(path, {
    method: "delete",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(obj),
  });

  if (!res.ok) {
    let message = await res.text();
    console.log("failed to accept job:" + message);
    return;
  }

  Swal.fire({
    icon: "success",
    text: "已取消此工作!",
  }).then(() => {
    if(userId == employer.job_id[0].employer_id) {
      loadEmployerJob("waiting")
    } else {
      loadFreelanceJob("applied");
    }
    loadJobNumber("waiting", true);
    loadJobNumber("accepted", true);
    loadJobNumber("completed", true);
    loadJobNumber("applied", false);
    loadJobNumber("confirmed", false);
    loadJobNumber("completed", false);
  });
  
}

// employer part
// load job number
async function loadJobNumber(jobStatus, is_employer) {
  let res;
  let userId = await getUserId();

  if (is_employer) {
    res = await fetch(`/employer/${userId}/${jobStatus}`);
  } else {
    res = await fetch(`/freelancer/${userId}/${jobStatus}`);
  }
  let json = await res.json();
  // console.log(json);
  let text;

  switch (jobStatus) {
    case "waiting":
      text = `等待接受的工作 (${json.employer_id.length})`;
      break;
    case "accepted":
      text = `進行中工作 (${json.employer_id.length})`;
      break;
    case "completed":
      if (is_employer) {
        text = `已完成工作 (${json.employer_id.length})`;
      } else {
        text = `已完成工作 (${json.length})`;
      }
      break;
    case "applied":
      text = `想接的工作 (${json.length})`;
      break;
    case "confirmed":
      text = `已確認做的工作 (${json.length})`;
      break;
    default:
      break;
  }

  if (jobStatus == "completed" && is_employer) {
    document.querySelector("#doneBtn").textContent = text;
  } else {
    document.querySelector(`#${jobStatus}Btn`).textContent = text;
  }
}

// change page
function changePage(jobStatus, is_employer) {
  let jobStatusTitle = document.querySelector("#jobStatusTitle");
  let text;
  switch (jobStatus) {
    case "waiting":
      text = "等待接受的工作";
      break;
    case "accepted":
      text = "進行中工作";
      break;
    case "completed":
      text = "已完成工作";
      break;
    case "applied":
      text = "想接的工作";
      break;
    case "confirmed":
      text = "已確認工作";
      break;
    default:
      break;
  }

  if (is_employer) {
    loadEmployerJob(jobStatus);
  } else {
    loadFreelanceJob(jobStatus);
  }
  jobStatusTitle.textContent = text;
}



// find out which freelancer has applied
async function findAppliedFreelancer(requestId) {
  // let requestId = parseInt(event.currentTarget.parentNode.id);

  let res = await fetch("/findAppliedFreelancer/" + requestId);

  if (!res.ok) {
    let message = await res.text();
    console.log("failed to load freelancer:" + message);
    return;
  }

  let result = await res.json();

  if (result.length > 0) {
    let html = "";
    let node = document.getElementById(requestId);

    for (let freelancer of result) {
      html += `<input type="radio" id="request${requestId}-${freelancer.id}" data-freelancerid="${freelancer.id}" name="freelancer-list-item" value="${freelancer.nickname}">
      <label for="request${requestId}-${freelancer.id}">${freelancer.nickname}</label><br>`;
    }
    node.querySelector("#freelancer-list").innerHTML = html;
    node.querySelector("#acceptBtn").style.display = "inline";
  }
}

// match freelancer function

async function matchFreelancer(event) {
  let requestId = parseInt(event.currentTarget.parentNode.parentNode.id);
  console.log(requestId)
  let userId = await getUserId();
  let node = document.getElementById(`${requestId}`);
  let items = node.querySelectorAll('input[name="freelancer-list-item"]');

  for (let item of items) {
    if (item.checked) {
      chosenFreelancerId = item.dataset.freelancerid;
      break;
    }
  }

  let obj = {
    requestId: requestId,
    chosenFreelancerId: chosenFreelancerId,
  };

  let res = await fetch("/matchFreelancer", {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(obj),
  });

  if (!res.ok) {
    let message = await res.text();
    console.log("failed to match freelancer:" + message);
    return;
  }
  Swal.fire({
    icon: "success",
    text: "已選擇此工作的Freelancer!",
  }).then(() => {
    loadEmployerJob("accepted");
    loadJobNumber("waiting", true);
    loadJobNumber("accepted", true);
    loadJobNumber("completed", true);
    loadJobNumber("applied", false);
    loadJobNumber("confirmed", false);
    loadJobNumber("completed", false);
  });
}

// complete job function (clicked by the employer)

async function completeJobEmployer(event) {
  let requestId = parseInt(event.currentTarget.parentNode.parentNode.id);
  // let userId = await getUserId();
  // let node = document.getElementById(`${requestId}`)
  // let items = node.querySelectorAll('input[name="freelancer-list-item"]')

  // for (let item of items) {
  //   if (item.checked) {
  //     chosenFreelancerId = item.dataset.freelancerid;
  //     break;
  // }}

  let obj = {
    requestId: requestId,
    // chosenFreelancerId: chosenFreelancerId,
  };

  // console.log(obj)

  let res = await fetch("/completeJob", {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(obj),
  });

  if (!res.ok) {
    let message = await res.text();
    console.log("failed to complete the job" + message);
    return;
  }
  Swal.fire({
    icon: "success",
    text: "已完成此工作!",
  }).then(() => {
    loadEmployerJob("completed");
    loadJobNumber("waiting", true);
    loadJobNumber("accepted", true);
    loadJobNumber("completed", true);
    loadJobNumber("applied", false);
    loadJobNumber("confirmed", false);
    loadJobNumber("completed", false);
  });
}

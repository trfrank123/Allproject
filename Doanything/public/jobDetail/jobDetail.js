const params = new URLSearchParams(window.location.search);
const jobId = params.get("jobId");
const socket = io(`http://localhost:8080`);
let chatBtn = document.querySelector("#chatBtn");
let chatroom = document.querySelector(".chatroomContainer");
let sendBtn = chatroom.querySelector(".sendBtn");
let chatInput = chatroom.querySelector(".chatInput");
let chatBox = chatroom.querySelector(".chatBox");
let chatHeaderName = document.querySelector("#userName");
chatBtn.style.display = "none";
document.querySelector("#acceptBtn").style.display = "none";

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

//get job detail by id in fetch
async function getDetail() {
  let userId = await getUserId();

  let res = await fetch(`/jobs/${jobId}`);
  let res2 = await fetch(`/jobStatus/${jobId}`);

  let job = await res.json();
  job = job.job_id[0];

  if (userId == job.employer_id) {
    chatBtn.style.display = "block";
  } else {
    document.querySelector("#acceptBtn").style.display = "block";
  }

  if (res2.ok) {
    let jobStatus = await res2.json();
    console.log(jobStatus);

    if (
      jobStatus.filter((obj) => obj.freelancer_user_id == userId)[0] &&
      jobStatus[0].status == "applied" || jobStatus[0].status == "confirmed"
    ) {
      chatBtn.style.display = "block";
      document.querySelector("#acceptBtn").style.display = "none";
    }
  }

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

  document.querySelector("#title").textContent = job.title;
  document.querySelector("#category").textContent = job.category_name;
  document.querySelector("#startTime").textContent = formatDate(job.start_time);
  document.querySelector("#deadline").textContent = formatDate(job.deadline);

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

  document.querySelector("#skill").textContent = job.skill_name;

  switch (job.location) {
    case "HK":
      job.location = "香港島";
      break;
    case "NT":
      job.location = "新界";
      break;
    case "KL":
      job.location = "九龍";
      break;
    case "home":
      job.location = "在家工作";
      break;
    default:
      job.location = "";
      break;
  }

  document.querySelector("#location").textContent = job.location;
  document.querySelector("#detail").innerHTML = JSON.parse(job.detail).content;
  document.querySelector("#reward").textContent = "$ " + job.reward;
  if (!job.image) {
    document.querySelector("#image").textContent = `沒有其他附加圖片`;
  } else {
    document.querySelector(
      "#image"
    ).innerHTML = `<img src=../request_uploads/${job.image}></img>`;
  }
  document.querySelector("#nickname").textContent = job.employer_name;
  document.querySelector("#intro").textContent = job.employer_intro;
  if(job.profile_image) {
    document.querySelector('#employer_img').src = `/userupload/${job.profile_image}` 
  }
}

getDetail();

//get user id
async function getUserId() {
  let res = await fetch("/user");
  if (!res.ok) {
    return;
  }
  res = await res.json();
  return res.id;
}

//accept job for freelancer
const acceptBtn = document.querySelector("#acceptBtn");

acceptBtn.addEventListener("click", async () => {
  let obj = {
    requestId: jobId,
    userId: await getUserId(),
  };

  if (!obj.userId) {
    Swal.fire({
      icon: "warning",
      text: "請先登入!",
    }).then(() => {
      window.location = "/login";
    });
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
        icon: "warning",
        title: "已接受此工作！",
      });
    }
    return;
  }

  Swal.fire({
    icon: "success",
    text: "成功接受此工作！",
  }).then(() => {
    window.location = "/jobManage/index.html";
  });
});

//TODO: chat in fetch
socket.on("new-message", (msg) => {
  updateMessage(msg);
});

function clearRecord() {
  chatBox.innerHTML = "";
}

let requestId;
let receiverId;

async function loadChatroom() {
  clearRecord();
  let userId = await getUserId();

  if (userId) {
    let job = await fetch(`/jobs/${jobId}`);
    job = await job.json();
    job = job.job_id[0];
    requestId = job.id;

    let chatRecords = await fetch("/chat/" + requestId);
    let recordsArr = await chatRecords.json();

    console.log(recordsArr);

    let others = recordsArr.filter((obj) => obj.sender_id != userId);

    if (!recordsArr[0] && userId != job.employer_id) {
      chatHeaderName.textContent = job.employer_name;
      receiverId = job.employer_id;
      chatroom.style.display = "flex";
    } else if (!recordsArr[0] && userId == job.employer_id) {
      Toast.fire({
        icon: "warning",
        title: "沒有聊天紀錄！",
      });
    } else if (recordsArr && userId == job.employer_id) {
      chatroom.style.display = "flex";
      chatHeaderName.textContent = others[0].sender_name;
      receiverId = others[0].sender_id;
    } else if (
      (recordsArr && (userId == others[0].sender_id) == true) ||
      (userId == others[0].receiver_id) == true
    ) {
      chatroom.style.display = "flex";
      receiverId = userId;
      chatHeaderName.textContent = job.employer_name;
    }

    for (let record of recordsArr) {
      let chatMsg = document.createElement("li");

      if (record.sender_id == userId) {
        chatMsg.innerHTML = `<p>Me: ${record.chat_message}</p>`;
        chatMsg.classList.add("chatRight");
      } else {
        chatMsg.innerHTML = `<p>${record.sender_name}: ${record.chat_message}</p>`;
        chatMsg.classList.add("chatLeft");
      }
      chatBox.appendChild(chatMsg);
    }

    document.querySelector(".chatContent").scrollTo({
      top: document.querySelector(".chatContent").clientHeight + 1000,
    });
  }
}

chatBtn.addEventListener("click", async () => {
  let userId = await getUserId();
  if (userId) {
    loadChatroom();
  } else {
    Swal.fire({
      icon: "warning",
      text: "請先登入!",
    }).then(() => {
      window.location = "/login";
    });
  }
});

async function updateMessage(msg) {
  let userId = await getUserId();
  let chatMsg = document.createElement("li");

  if (msg.sender_id == userId) {
    chatMsg.innerHTML = `<p>Me: ${msg.chat_message}</p>`;
    chatMsg.classList.add("chatRight");
  } else {
    chatMsg.innerHTML = `<p>${msg.sender_name}: ${msg.chat_message}</p>`;
    chatMsg.classList.add("chatLeft");
  }
  chatBox.appendChild(chatMsg);
  document.querySelector(".chatContent").scrollTo({
    top: document.querySelector(".chatContent").clientHeight + 1000,
    method: "smooth",
  });
}

async function sendMessage() {
  let obj = {
    chat_message: chatInput.value,
    sender_id: await getUserId(),
    receiver_id: receiverId,
    request_id: requestId,
  };

  let res = await fetch("/chat", {
    method: "post",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(obj),
  });

  if (!res.ok) {
    let message = await res.text();
    console.log("error:" + message);
    return;
  }
  chatInput.value = "";
}

sendBtn.addEventListener("click", sendMessage);

function closeChatroom() {
  chatroom.style.display = "none";
}

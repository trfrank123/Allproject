let urgentList = document.querySelector("#urgentJob");
let normalList = document.querySelector("#normalJob");
let infiniteList = document.querySelector("#infiniteJob");
let jobCard = document.querySelector(".jobCard");
jobCard.remove();

const Toast = Swal.mixin({
  toast: true,
  position: "bottom-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
});

async function getUserId() {
  let res = await fetch("/user");
  if (!res.ok) {
    return;
  }
  res = await res.json();
  return res.id;
}

function formatDate(date) {
  return date.slice(0, 10) + " " + date.slice(11, 19);
}

async function getDetail(event) {
  let jobId = await event.currentTarget.parentNode.id;
  if (jobId) {
    window.location = `/jobDetail/jobDetail.html?jobId=${jobId}`;
  }
}

//search bar fetch job title
let allJobTitles = [];
let allJobDetails = [];

async function loadAllJob() {
  let res = await fetch("/jobsByTitle");
  let json = await res.json();
  for (let job of json.jobsByTitle) {
    allJobTitles.push(job.title);
    allJobDetails.push(JSON.parse(job.detail).plainText);
  }
}

loadAllJob();

console.log(allJobTitles);
console.log(allJobDetails);

// search bar
function autocomplete(inp, arr, arr2) {
  let currentFocus;
  inp.addEventListener("input", function (e) {
    let a,
      b,
      i,
      val = this.value;

    closeAllLists();
    if (!val) {
      return false;
    }
    currentFocus = -1;
    /*create a DIV element that will contain the items (values):*/
    a = document.createElement("DIV");
    a.setAttribute("id", this.id + "autocomplete-list");
    a.setAttribute("class", "autocomplete-items");
    /*append the DIV element as a child of the autocomplete container:*/
    this.parentNode.appendChild(a);

    // limit the suggestion number
    let suggestionCount = 0;

    for (let i = 0; i < arr.length; i++) {
      let titleText = arr[i];
      let detailText = arr2[i] ? arr2[i] : "";

      if (titleText.toUpperCase().includes(val.toUpperCase()) || detailText.toUpperCase().includes(val.toUpperCase())) {
        if (suggestionCount < 5) {

          b = document.createElement("DIV");
          if (titleText.toUpperCase().includes(val.toUpperCase())) {
            // TODO find out how to search chinese
            // b.innerHTML = arr[i].substr(0, arr[i].indexOf(val));
            // b.innerHTML += "<strong>" + val + "</strong>";
            // b.innerHTML += arr[i].substr(arr[i].indexOf(val) + val.length + 1);
            b.innerHTML = arr[i];
          } else {
            b.innerHTML = arr[i];
          }


          //show detail
          //   if (arr2[i] != undefined) {
          //   if (arr2[i].indexOf(val) >0) {
          //     b.innerHTML += " (keyword found in detail)";
          //   }
          // }

          b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
          b.addEventListener("click", function (e) {
            inp.value = this.getElementsByTagName("input")[0].value;
            closeAllLists();
          });
          a.appendChild(b);
          suggestionCount++;
        }
      }
    }
    if (suggestionCount == 0) {
      document.querySelector(".autocomplete-items").style.display = "none";
    }
  });
  /*execute a function presses a key on the keyboard:*/
  inp.addEventListener("keydown", function (e) {
    var x = document.getElementById(this.id + "autocomplete-list");
    if (x) x = x.getElementsByTagName("div");
    if (e.keyCode == 40) {
      currentFocus++;
      addActive(x);
    } else if (e.keyCode == 38) {
      currentFocus--;
      addActive(x);
    } else if (e.keyCode == 13) {
      /*If the ENTER key is pressed, prevent the form from being submitted,*/
      // e.preventDefault();
      if (currentFocus > -1) {
        /*and simulate a click on the "active" item:*/
        if (x) x[currentFocus].click();
      }
    }
  });
  function addActive(x) {
    /*a function to classify an item as "active":*/
    if (!x) return false;
    /*start by removing the "active" class on all items:*/
    removeActive(x);
    if (currentFocus >= x.length) currentFocus = 0;
    if (currentFocus < 0) currentFocus = x.length - 1;
    /*add class "autocomplete-active":*/
    x[currentFocus].classList.add("autocomplete-active");
  }
  function removeActive(x) {
    /*a function to remove the "active" class from all autocomplete items:*/
    for (var i = 0; i < x.length; i++) {
      x[i].classList.remove("autocomplete-active");
    }
  }
  function closeAllLists(elmnt) {
    /*close all autocomplete lists in the document,
      except the one passed as an argument:*/
    var x = document.getElementsByClassName("autocomplete-items");
    for (var i = 0; i < x.length; i++) {
      if (elmnt != x[i] && elmnt != inp) {
        x[i].parentNode.removeChild(x[i]);
      }
    }
  }
  /*execute a function when someone clicks in the document:*/
  document.addEventListener("click", function (e) {
    closeAllLists(e.target);
  });
}

// get all type of skills and loop as button
let skillBtnList = document.querySelector(".skillBtn");

async function getSkills() {
  let res = await fetch("/filter/skills");

  if (!res.ok) {
    let message = await res.text();
    console.log("failed to load skills:" + message);
    return;
  }

  let json = await res.json();

  for (let skill of json) {
    let button = document.createElement("button");
    button.dataset.id = skill.id;
    button.classList.add("skill");
    switch (skill.type) {
      case "photography":
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15 12L18 6H30L33 12H15Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linejoin="round"/><rect x="4" y="12" width="40" height="30" rx="3" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linejoin="round"/><path d="M24 35C28.4183 35 32 31.4183 32 27C32 22.5817 28.4183 19 24 19C19.5817 19 16 22.5817 16 27C16 31.4183 19.5817 35 24 35Z" fill="#ff9b21" stroke="#FFF" stroke-width="3" stroke-linejoin="round"/></svg>
        <p>攝影</p>
        </div>
        `;
        break;
      case "teaching":
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6V42H30V6H4Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 42V6" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 6H36V38L40 42L44 38V6Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 12H44" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 6H4" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 42H4" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M36 6V22" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M44 6V22" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <p>教學/教育</p>
        </div>
        `;
        break;
      case "cleaning":
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 5.91406H28V13.9141H43V21.9141H5V13.9141H20V5.91406Z" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40H40V22H8V40Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linejoin="round"/><path d="M16 39.8976V33.9141" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 39.8977V33.8977" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 39.8976V33.9141" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 40H36" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <p>清潔</p>
        </div>
        `;
        break;
      case "cooking":
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 42L42 42" stroke="#333" stroke-width="3" stroke-linecap="round"/><path d="M6 36L42 36" stroke="#333" stroke-width="3" stroke-linecap="round"/><path d="M9 25C9 16.7157 15.7157 10 24 10C32.2843 10 39 16.7157 39 25V36H9L9 25Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 25V29" stroke="#FFF" stroke-width="3" stroke-linecap="round"/><path d="M28 10V8C28 5.79086 26.2091 4 24 4V4C21.7909 4 20 5.79086 20 8V10" stroke="#333" stroke-width="3"/></svg>
        <p>煮食</p>
        </div>
        `;
        break;
      case "shopping":
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 17H43L38.8 43H9.2L5 17Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M35 17C35 10.3726 30.0751 5 24 5C17.9249 5 13 10.3726 13 17" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="17" cy="26" r="2" fill="#FFF"/><path d="M18 33C18 33 20 36 24 36C28 36 30 33 30 33" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><circle cx="31" cy="26" r="2" fill="#FFF"/></svg>
        <p>代買</p>
        </div>
        `;
        break;
      case "finding":
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21 38C30.3888 38 38 30.3888 38 21C38 11.6112 30.3888 4 21 4C11.6112 4 4 11.6112 4 21C4 30.3888 11.6112 38 21 38Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linejoin="round"/><path d="M26.657 14.3431C25.2093 12.8954 23.2093 12 21.0001 12C18.791 12 16.791 12.8954 15.3433 14.3431" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M33.2216 33.2217L41.7069 41.707" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
        <p>尋人/寵物</p>
        </div>
        `;
        break;
      case "repairing":
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.4417 5C32.406 5 34.265 5.44776 35.9207 6.24607L32.7172 9.42668C30.8706 11.2601 30.8706 14.2327 32.7172 16.0661C34.5638 17.8995 37.5578 17.8995 39.4044 16.0661L42.2571 13.2337C42.7379 14.5558 43 15.9818 43 17.4685C43 24.3547 37.3775 29.937 30.4417 29.937C28.7825 29.937 27.1985 29.6176 25.7486 29.0373L13.07 41.6253C11.2238 43.4582 8.2307 43.4582 6.38459 41.6253C4.53847 39.7924 4.53847 36.8207 6.38459 34.9877L18.9523 22.5099C18.2651 20.9684 17.8834 19.2627 17.8834 17.4685C17.8834 10.5823 23.5059 5 30.4417 5Z" fill="#E48F27" stroke="#333" stroke-width="3" stroke-linejoin="round"/></svg>
        <p>維修</p>
        </div>
        `;
        break;
      case "programming":
        button.innerHTML = `
        <div class="btnContent">
        <svg width="22" height="22" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="19" y="32" width="10" height="9" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><rect x="5" y="8" width="38" height="24" rx="2" fill="#E48F27" stroke="#333" stroke-width="3"/><path d="M22 27H26" stroke="#FFF" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M14 41L34 41" stroke="#333" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>        <p>網頁/APP開發</p>
        </div>
        `;
        break;
      default:
        button.textContent = skill.type;
        break;
    }

    button.onclick = () => {
      button.classList.toggle("active");
      clearJob();
      filterBySkill();
    };
    skillBtnList.prepend(button);
  }
}
getSkills();

//clear job
function clearJob() {
  urgentList.innerHTML = "";
  normalList.innerHTML = "";
  infiniteList.innerHTML = "";
}

// skill btn active
let skillBtn = skillBtnList.getElementsByClassName("skill");

// reset button
document.querySelector("#resetBtn").addEventListener("click", () => {
  skillBtnList.querySelectorAll(".active").forEach((button) => {
    button.classList.remove("active");
  });
  clearJob();
  filterBySkill();
});

// job filter
async function filterBySkill() {
  let params = new URLSearchParams();
  skillBtnList.querySelectorAll(".active").forEach((btn) => {
    params.append("skill_id", btn.dataset.id);
  });

  let url = "/filter?" + params;
  let userId = await getUserId();
  let res = await fetch(url);

  if (!res.ok) {
    let message = await res.text();
    console.log("failed to load job list:" + message);
    return;
  }

  let json = await res.json();

  for (let job of json) {
    let node = jobCard.cloneNode(true);
    node.id = job.id;
    if (userId) {
      let bookmarks = await fetch("/bookmark/" + userId);
      let bookmark_json = await bookmarks.json();

      for (let bookmark of bookmark_json) {
        if (bookmark.id === job.id) {
          node.querySelector(".bookmarkBtn").innerHTML =
            '<i id="bookmark_solid" class="fa-solid fa-heart"></i>';
        }
      }
    }

    switch (job.category_name) {
      case "normal":
        listName = normalList;
        break;
      case "urgent":
        listName = urgentList;
        break;
      case "infinite":
        listName = infiniteList;
        break;
      default:
        break;
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
      case "photography":
        job.skill_name = "攝影";
        break;
      case "finding":
        job.skill_name = "搜尋";
        break;
      case "cleaning":
        job.skill_name = "清潔";
        break;
      case "teaching":
        job.skill_name = "教學";
        break;
      case "cooking":
        job.skill_name = "煮食";
        break;
      case "shopping":
        job.skill_name = "代買";
        break;
      case "repairing":
        job.skill_name = "維修";
        break;
      case "programming":
        job.skill_name = "編寫程式";
        break;
      default:
        break;
    }

    if (job.category_name === "normal") {
      node.style.borderTop = "5px solid #F2AC57";
    } else if (job.category_name === "urgent") {
      node.style.borderTop = "5px solid #FF7171";
    } else {
      node.style.borderTop = "5px solid #0E263E";
    }

    if (userId == job.post_user_id) {
      node.querySelector(".applyBtn").style.display = "none";
    }

    node.querySelector("#title").textContent = job.title;
    node.querySelector("#skill").textContent = job.skill_name;
    node.querySelector("#location").textContent = job.location;
    node.querySelector("#deadline").textContent = formatDate(job.deadline);
    node.querySelector("#reward").textContent = "$ " + job.reward;
    node.querySelector("#detail").innerHTML = JSON.parse(job.detail).content;
    node.querySelector("#area").textContent = job.location_area;

    listName.appendChild(node);
  }
}
filterBySkill();

autocomplete(document.getElementById("keyword"), allJobTitles, allJobDetails);

//accept job from freelancer
async function applyJob(event) {
  let userId = await getUserId();
  let requestId = event.target.parentNode.id;

  let obj = {
    userId: userId,
    requestId: requestId,
  };

  if (!obj.userId) {
    Swal.fire({
      icon: 'warning',
      text: '請先登入!',
    }).then(() => {
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
        icon: "warning",
        title: "已接受此工作！",
      });
    } else if (message === "Error: user no found in session!") {
      Swal.fire({
        icon: "warning",
        text: "請先登入!",
      }).then(() => {
        window.location = "/login";
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
}

// add job to book mark
let bookmarkBtn = jobCard.querySelector(".bookmarkBtn");

async function handleBookmark(event) {
  let userId = await getUserId();
  let requestId = event.target.parentNode.parentNode.id;
  let obj = {
    userId: userId,
    requestId: requestId,
  };

  if (event.target.id == "bookmark_regular") {
    // add job to bookmark
    let res = await fetch("/bookmark", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    });

    if (!res.ok) {
      let message = await res.text();
      console.log("failed to accept job:" + message);
      Swal.fire({
        icon: "warning",
        text: "請先登入!",
      }).then(() => {
        window.location = "/login";
      });
    } else {
      event.target.parentNode.innerHTML =
        '<i id="bookmark_solid" class="fa-solid fa-heart"></i>';
      Toast.fire({
        icon: "success",
        title: "成功加入收藏夾!",
      });
    }
  } else if (event.target.id == "bookmark_solid") {
    // delete job from bookmark
    let res = await fetch("/bookmark", {
      method: "delete",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(obj),
    });

    if (!res.ok) {
      Toast.fire({
        icon: "error",
        title: "收藏失敗！",
      });
    } else {
      event.target.parentNode.innerHTML =
        '<i id="bookmark_regular" class="fa-regular fa-heart"></i>';
      Toast.fire({
        icon: "success",
        title: "已取消收藏!",
      });
    }
  }
}

// Scroll function start
let normalScrollAmount = 0;
let urgentScrollAmount = 0;
let infiniteScrollAmount = 0;
let scrollWidth = 275;

document.querySelector("#normalLeft").addEventListener("click", () => {
  normalList.scrollTo({
    left:
      normalScrollAmount <= scrollWidth
        ? normalScrollAmount = 0
        : normalScrollAmount -= scrollWidth,
    behavior: "smooth",
  });
});

document.querySelector("#normalRight").addEventListener("click", () => {
  normalList.scrollTo({
    left: normalScrollAmount <= normalList.scrollWidth - scrollWidth 
    ? normalScrollAmount += scrollWidth 
    : normalScrollAmount += 0,
    behavior: "smooth",
  });
});

document.querySelector("#urgentLeft").addEventListener("click", () => {
  urgentList.scrollTo({
    left:
      urgentScrollAmount <= scrollWidth
        ? urgentScrollAmount = 0
        : urgentScrollAmount -= scrollWidth,
    behavior: "smooth",
  });
});

document.querySelector("#urgentRight").addEventListener("click", () => {
  urgentList.scrollTo({
    left: urgentScrollAmount <= urgentList.scrollWidth - scrollWidth 
    ? urgentScrollAmount += scrollWidth 
    : urgentScrollAmount += 0,
    behavior: "smooth",
  });
});

document.querySelector("#infiniteLeft").addEventListener("click", () => {
  infiniteList.scrollTo({
    left:
    infiniteScrollAmount <= scrollWidth
        ? infiniteScrollAmount = 0
        : infiniteScrollAmount -= scrollWidth,
    behavior: "smooth",
  });
});

document.querySelector("#infiniteRight").addEventListener("click", () => {
  infiniteList.scrollTo({
    left: infiniteScrollAmount <= infiniteList.scrollWidth - scrollWidth 
    ? infiniteScrollAmount += scrollWidth 
    : infiniteScrollAmount += 0,
    behavior: "smooth",
  });
});

// Scroll function end

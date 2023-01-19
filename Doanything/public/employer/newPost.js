// check login

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
  if (!userId) {
  
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

// remove millisecond
window.addEventListener("load", () => {
    var now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());

    /* remove second/millisecond if needed - credit ref. https://stackoverflow.com/questions/24468518/html5-input-datetime-local-default-value-of-today-and-current-time#comment112871765_60884408 */
    now.setMilliseconds(null);
    now.setSeconds(null);

    document.getElementById("start_time").value = now
      .toISOString()
      .slice(0, -1);
    document.getElementById("deadline").value = now
      .toISOString()
      .slice(0, -1);
  });

  // quill
  let quill = new Quill('#editor', {
    theme: 'snow'
  });

//  console.log()

  function DoSubmit(){
    let richText = quill.root.innerHTML;
    
    let plainText = quill.getText().replaceAll(`\n`, ' ')
    
    document.postjob.detail.value = JSON.stringify({"content": richText, "plainText" : plainText});
    return true;
  }
  
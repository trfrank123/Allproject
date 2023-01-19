
let file = null;
document
  .querySelector("#signup-form")
  .addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("submit")

    // Serialize the Form afterwards
    const form = event.target;
    const formData = new FormData();
    formData.append("username", form.username.value);
    formData.append("password", form.password.value);
    formData.append("email", form.email.value);
    // formData.append('date_of_birth',form.date_of_birth.value)
    formData.append("phone", form.phone.value);
    // let formJson = [formData]
    formData.append("intro", form.intro.value);
    formData.append("nickname", form.nickname.value);
    if (file) {
      formData.append("profile_image", file);
    }
    // formData.append('photo_name',form.photo_name

    const res = await fetch("/signUp", {
      method: "post",

      body: formData,
    });
    console.log(res);
    if (res.status == 403) {
      alert("fail to signup");
    }
    // const result = await res.json()
    // console.log(await result);
    // document.querySelector('#contact-result').innerHTML = await (result)
    window.location = "/";
  });

// change password
let password = document.querySelector("#password");
let checkPassword = document.querySelector("#check_password");

checkPassword.addEventListener("change", () => {
  if (password.value != checkPassword.value) {
    console.log("hihi");
  } else {
    console.log("byeeeee");
  }
});
function selectImg() {
  let input = document.createElement("input");
  input.type = "file";
  input.onchange = function () {
    file = input.files[0];
  };
  input.hidden = true;
  document.body.appendChild(input);
  input.click();
}
// document.querySelector('#photo').addEventListener('click', async function(event){
//   let res = await fetch('/singUp' , {method: 'POST'});

// })

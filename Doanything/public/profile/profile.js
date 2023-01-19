

let form = document.querySelector("#profile");


async function information(){
let res = await fetch("/profile", {
    method: 'get',
    headers:{
        'Content-Type': 'application/json',
    }})
let profile = await res.json();
for (let element of form) {
    
    if (!profile[element.name]) continue
    if (element.name !== "password"){
    element.value = profile[element.name]
}}
}
information()
form.addEventListener("submit",async function(event){
    event.preventDefault()
    const form = event.target
    formData = new FormData()
    formData.append('username',form.username.value)
    formData.append('password',form.password.value)
    formData.append('email',form.email.value)
    // formData.append('date_of_birth',form.date_of_birth.value)
    formData.append('phone',form.phone.value)
    // let formJson = [formData]
    formData.append('intro',form.intro.value)
    formData.append('nickname',form.nickname.value)
    // formData.append('photo_name',form.photo_name
    if (file) {
        formData.append("profile_image", file);
      }
    // formData.append['profile_image'] = form.profile_image.value
    console.log(formData.append)
    let res = await fetch("/profile" , {
    method: 'PATCH',
   
    body:formData
})

window.location = ('/')
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


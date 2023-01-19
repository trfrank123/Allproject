// document.querySelector('#login-form')
//   .addEventListener('submit', async function (event) {
// event.preventDefault()

//     // Serialize the Form afterwards
//     const form = event.target
//     const formObject = {}
//     formObject['username'] = form.username.value
//     formObject['password'] = form.password.value
//     formObject['email'] = form.email.value
//     // formObject['date_of_birth'] = form.date_of_birth.value
//     formObject['phone'] = form.phone.value
//     // let formJson = [formObject]
//     const res = await fetch("/api/login", {
//       method: 'post',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(formObject)
//     })
//     // const result = await res.json()
//     // console.log(await result);
//     // document.querySelector('#contact-result').innerHTML = await (result)
// //window.location = ('/')
// })
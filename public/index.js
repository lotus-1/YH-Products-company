// // const button = document.getElementsById('button');
// // button.addEventListener('click', (event) => {
// //   event.preventDefault();
// fetch("/get")
//   .then(response => {
//     return response.json();
//   })
//   .then(data => {
//     console.log("This is the data: ", data);
//
//     var table = document.getElementById("productsTable");
//     data.forEach(names => {
//       var row = document.createElement("tr");
//
//       var fullName = document.createElement("td");
//       fullName.textContent = names.full_name;
//       row.appendChild(fullName);
//
//       var addressDetails = document.createElement("td");
//       addressDetails.textContent = names.address;
//       row.appendChild(addressDetails);
//
//       var phoneNumber = document.createElement("td");
//       phoneNumber.textContent = names.phone;
//       row.appendChild(phoneNumber);
//
//       table.appendChild(row);
//     });
//   })
//   .catch(error => {
//     console.log("This is an error: ", error);
//   });
//
//   const signupButton = document.getElementById('signup');
//   signupButton.addEventListener('click', (event) => {
//     event.preventDefault();
//
//   })
//
//   const loginButton = document.getElementById('login');
//   loginButton.addEventListener('click', (event) => {
//     event.preventDefault();
//   })

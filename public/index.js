const button = document.getElementsById('button');
button.addEventListener('click', (event) => {
  event.preventDefault();
fetch("/get")
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log("This is the data: ", data);

    var table = document.getElementById("clientsTable");
    data.forEach(names => {
      var row = document.createElement("tr");

      var fullName = document.createElement("td");
      fullName.textContent = names.full_name;
      row.appendChild(fullName);

      var addressDetails = document.createElement("td");
      addressDetails.textContent = names.address;
      row.appendChild(addressDetails);

      var phoneNumber = document.createElement("td");
      phoneNumber.textContent = names.phone;
      row.appendChild(phoneNumber);

      table.appendChild(row);
    });
  })
  .catch(error => {
    console.log("This is an error in fetch of get: ", error);
  });

  const signLogButton = document.getElementById('signLog');
  signupButton.addEventListener('click', (event) => {
    event.preventDefault();
    fetch('/static.js')
    .then(response => {
      return response.json();
    })
    .then(data => {
      var table = document.getElementById("productsTable");
      data.forEach(product => {
        var row = document.createElement("tr");

        var productName = document.createElement("td");
        productName.textContent = product.name;
        row.appendChild(productName);

        var category = document.createElement("td");
        category.textContent = product.category;
        row.appendChild(category);

        var price = document.createElement('td');
        price.textContent = product.price;
        row.appendChild(price);

    })
    .catch(error => {
      console.log("This is an error in fetch of static: ", error);
    });
    })
  })
  
console.log('index.js');

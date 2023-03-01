var pName = document.getElementById("proudctname");
var pCategory = document.getElementById("proudctcategory");
var pPrice = document.getElementById("proudctprice");
var pDesc = document.getElementById("description");
var searchInput = document.getElementById("searchproduct");
var addBtn = document.getElementById("btn");
if (localStorage.getItem("allProducts") == null) {
  var productBox = [];
} else {
  productBox = JSON.parse(localStorage.getItem("allProducts"));
  display();
}
addBtn.onclick = function () {
  if (pnameValidition() && categoryValidition() && priceValidition() && descValidition()) {
    if (addBtn.innerHTML == "Add Product") {
      create();
    }
    else {
      update()
    }
  } else {
    alert("enter a valid data");
  }
};

function create() {
  prdouct = {
    name: pName.value,
    category: pCategory.value,
    price: pPrice.value,
    desc: pDesc.value,
  };
  productBox.push(prdouct);
  localStorage.setItem("allProducts", JSON.stringify(productBox));
  display();
  reset();
}

function display() {
  var data = ``;
  for (var i = 0; i < productBox.length; i++) {
    data += `  <tr>
                    <td>${i + 1}</td>
                    <td>${productBox[i].name}</td>
                    <td>${productBox[i].category}</td>
                    <td>${productBox[i].price}</td>
                    <td>${productBox[i].desc}</td>
                    <td><button class="btn btn-warning" onclick="restore(${i})"><i class="fa-regular fa-pen-to-square"></i></button></td>
                    <td><button class="btn btn-danger" onclick="remove(${i});"><i class="fa-solid fa-trash"></i></button></td>
                    </tr>`;
  }
  document.getElementById("tablebody").innerHTML = data;
}

function reset() {
  pName.value = "";
  pCategory.value = "";
  pPrice.value = "";
  pDesc.value = "";
}

function remove(index) {
  productBox.splice(index, 1);
  localStorage.setItem("allProducts", JSON.stringify(productBox));
  display();
}

function search() {
  var trs = ``;
  for (var i = 0; i < productBox.length; i++) {
    if (productBox[i].name.toLowerCase().includes(searchInput.value.toLowerCase())) {
      trs += `
              <tr>
              <td>${i + 1}</td>
              <td>${productBox[i].name}</td>
              <td>${productBox[i].category}</td>
              <td>${productBox[i].price}</td>
              <td>${productBox[i].desc}</td>
              <td><button class="btn btn-warning" onclick="restore(${i})"><i class="fa-regular fa-pen-to-square"></i></button></td>
              <td><button class="btn btn-danger" onclick="remove(${i});"><i class="fa-solid fa-trash"></i></button></td>
              </tr>
          `;
    }
  }
  document.getElementById("tablebody").innerHTML = trs;
}

var currentIndex = 0;
function restore(index) {
  currentIndex = index;
  pName.value = productBox[currentIndex].name;
  pCategory.value = productBox[currentIndex].category;
  pPrice.value = productBox[currentIndex].price;
  pDesc.value = productBox[currentIndex].desc;
  addBtn.innerHTML = "update Product";
}

function update() {
  prdouct = {
        name: pName.value,
        category: pCategory.value,
        price: pPrice.value,
        desc: pDesc.value,
      };
  productBox[currentIndex] = prdouct;
  addBtn.innerHTML = "Add Product";
  localStorage.setItem("allProducts", JSON.stringify(productBox));
  display();
  reset();
  }


function pnameValidition() {
  var nameRegex = /^([A-Z]|[a-z]){3,9}$/;
  var proudctname = pName.value;
  if (nameRegex.test(proudctname)) {
    return true;
  } else {
    return false;
  }
}

function categoryValidition() {
  var categoryRegex = /^([A-Za-z]){0,10}$/;
  var proudctcategory = pCategory.value;
  if (categoryRegex.test(proudctcategory)) {
    return true;
  } else {
    return false;
  }
}

function priceValidition() {
  var priceRegex = /^[0-9]{4,6}$/;
  var proudctprice = pPrice.value;
  if (priceRegex.test(proudctprice)) {
    return true;
  } else {
    return false;
  }
}

function descValidition() {
  var descRegex = /^([A-Za-z]){0,30}$/;
  var proudctdesc = pDesc.value;
  if (descRegex.test(proudctdesc)) {
    return true;
  } else {
    return false;
  }
}

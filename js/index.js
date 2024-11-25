var btnSubmit = document.querySelector("#submit");
var imputName = document.querySelector("#imputName");
var imputURL = document.querySelector("#iputURL");
var table = document.querySelector("#table");
var regexName = /^[a-zA-z0-9]{1,10}$/;
var regexURL = /^[A-Za-z0-9]{1,}\.[a-z]{3}$/;
var imputs;

if (localStorage.getItem("webSite") == null) {
  imputs = [];
} else {
  imputs = JSON.parse(localStorage.getItem("webSite"));
  display();
}

// add web site
btnSubmit.addEventListener("click", function (info) {
  // check valid input
  if (
    imputName.classList.contains("is-valid") &&
    imputURL.classList.contains("is-valid")
  ) {
    var bookMark = {
      name: imputName.value,
      url: imputURL.value,
    };
    imputs.push(bookMark);
    localStorage.setItem("webSite", JSON.stringify(imputs));
    display();
    clear();
  } else {
    alert("nooo");
    clear();
  }
});

//  delete web site
function DeleteURL(index) {
  imputs.splice(index, 1);
  localStorage.setItem("webSite", JSON.stringify(imputs));
  display();
}
// open new tap web site
function visitURL(index) {
  if (imputs[index].url.startsWith("http://")) {
    window.open(imputs[index].url);
  } else {
    window.open("http://" + imputs[index].url);
  }
}

// clear data after add
function clear() {
  imputName.value = null;
  imputURL.value = null;
}
// display web sites
function display() {
  var cartona = "";
  for (var i = 0; i < imputs.length; i++) {
    cartona += `
                <tr>
              <th scope="row">${i + 1}</th>
              <td>${imputs[i].name}</td>
              <td>
                <button onclick="visitURL(${i})" class="btn btn-success">
                  <i class="fa-regular text-white me-1 fa-eye"></i>Visit
                </button>
              </td>
              <td>
                <button onclick="DeleteURL(${i})" class="btn btn-danger">
                  <i class="fa-solid text-white me-1 fa-trash-can"></i>Delete
                </button>
              </td>
            </tr>
`;
  }
  table.innerHTML = cartona;
}

// validation data

imputName.addEventListener("input", function (e) {
  if (regexName.test(imputName.value)) {
    imputName.classList.add("is-valid");
    imputName.classList.remove("is-invalid");
  } else {
    imputName.classList.remove("is-valid");
    imputName.classList.add("is-invalid");
  }
});
imputURL.addEventListener("input", function () {
  if (regexURL.test(imputURL.value)) {
    imputURL.classList.add("is-valid");
    imputURL.classList.remove("is-invalid");
  } else {
    imputURL.classList.remove("is-valid");
    imputURL.classList.add("is-invalid");
  }
});

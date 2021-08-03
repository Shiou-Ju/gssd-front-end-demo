const close = document.getElementById("close");
const modal = document.getElementById("modal");

//modal
const submitModal = document.querySelector(".submit-btn");
const modalCheckBox = document.getElementById("checkbox");
const submitForm = document.getElementById("send-form");

//表單參數
const addressee = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//隱藏 modal
submitModal.addEventListener("click", (e) => {
  modal.classList.remove("show-modal");
  e.preventDefault();
});

//顯示modal
window.addEventListener("DOMContentLoaded", function () {
  modal.classList.add("show-modal");
  submitModal.setAttribute("disabled", "");
});

//modal關閉的動作
modalCheckBox.onchange = function () {
  if (this.checked) {
    submitModal.removeAttribute("disabled");
  } else {
    submitModal.setAttribute("disabled", "");
  }
};

//表單顏色控制
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-group error";

  const small = formControl.querySelector("small");
  small.innerText = message;
}
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-group success";
}

//check email is valid
function checkEmail(input) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (input.value.length !== 0) {
    if (re.test(input.value)) {
      showSuccess(input);
    } else {
      showError(input, `email不正確`);
    }
  } else {
    return true;
  }
}

//check required fields
function checkRequired(inputArr) {
  inputArr.forEach(function (input) {
    // console.log(input.value)
    if (input.value.trim() === "") {
      showError(input, `${getChiFieldName(input)}必填`);
    } else {
      showSuccess(input);
    }
  });
}

//check input length
function checkLength(input, min, max) {
  if (input.value.length !== 0) {
    if (input.value.length < min) {
      showError(input, `${getChiFieldName(input)}至少要${min}個英文字`);
    } else if (input.value.length > max) {
      showError(input, `${getChiFieldName(input)}要少於${max}個英文字`);
    } else {
      showSuccess(input);
    }
  } else {
    return true;
  }
}

//check passwords match
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "密碼不一致");
  }
}

//get field name if in English
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//get Chinese field name
function getChiFieldName(input) {
  return input.parentElement.querySelector("label").textContent;
}

//顯示資料傳輸中
function emailSent() {
  const small = document.getElementById("email-small");
  small.innerText = `資料傳送中，請稍等`;
  small.className = "sent";
}

//Event listeners
submitForm.addEventListener("click", function (e) {
  e.preventDefault();

  checkRequired([addressee, email, password, password2]);
  checkLength(addressee, 3, 15);
  checkLength(password, 6, 20);
  checkLength(password2, 6, 20);
  checkEmail(email);
  checkPasswordsMatch(password, password2);

  if (document.querySelector(".error")) {
    return false;
  } else {
    async function main() {
      emailSent();

      async function register() {
        let url = "<GSSD_EXPRESS_SERVER_API>/register";

        let formName = document.getElementById("name").value;
        let formEmail = document.getElementById("email").value;
        let formPassword = document.getElementById("password").value;
        let formData = {
          name: `${formName}`,
          email: `${formEmail}`,
          password: `${formPassword}`,
        };

        postData(url, formData)
          .then((data) => {
            if (data.success === false) {
              setTimeout(function () {
                window.location.href = "./regfailure.html";
              }, 800);
            } else if (data.success === true) {
              setTimeout(function () {
                window.location.href = "./regsuccess.html";
              }, 800);
            } else {
              setTimeout(function () {
                window.location.href = "./unknownerror.html";
              }, 800);
            }
          })
          .catch((error) => console.error(error));

        function postData(url, data) {
          return fetch(url, {
            body: JSON.stringify(data),
            headers: {
              "content-type": "application/json",
            },
            method: "POST",
          }).then((response) => response.json());
        }
      }
      await register();
      submitForm.disabled = true;
    }
    main();
  }
});

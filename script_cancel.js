const submitForm = document.getElementById("send-form");
const forgetPassword = document.getElementById("forget-password");
const forgetPasswordMobile = document.getElementById("forget-password-mobile");

//表單參數
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

//表單顏色控制
function showError(input, message) {
  const formControl = input.parentElement;
  formControl.className = "form-group error";
  const small = formControl.querySelector("small");
  small.innerText = message;
}

//show success
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-group success";
}

//clear all state:否則會發生按了一個按鈕另一個就沒辦法按的情形
function clearState() {
  email.parentElement.className = "form-group";
  password.parentElement.className = "form-group";
  password2.parentElement.className = "form-group";

  let smalls = document.querySelectorAll("small");
  smalls.forEach(function (item) {
    item.innerText = "";
  });
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
    if (input.value.trim() === "") {
      showError(input, `此項目為必填`);
    } else {
      showSuccess(input);
    }
  });
}

//check input length
function checkLength(input, min, max) {
  if (input.value.length !== 0) {
    if (input.value.length < min) {
      showError(input, `至少要${min}個英文字`);
    } else if (input.value.length > max) {
      showError(input, `要少於${max}個英文字`);
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
  clearState();
  checkRequired([email, password, password2]);
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
        let url = "<GSSD_EXPRESS_SERVER_API>";
        let formEmail = document.getElementById("email").value;
        let formPassword = document.getElementById("password").value;
        let formData = {
          email: `${formEmail}`,
          password: `${formPassword}`,
        };

        postData(url, formData)
          .then((data) => {
            console.log(data);
            if (data.success === false) {
              setTimeout(function () {
                window.location.href = "./canfailure.html";
              }, 800);
            } else if (data.success === true) {
              setTimeout(function () {
                window.location.href = "./cansuccess.html";
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
      forgetPassword.disabled = true;
      forgetPasswordMobile.disabled = true;
    }
    main();
  }
});

//忘記密碼的功能
forgetPassword.addEventListener("click", function (e) {
  e.preventDefault();
  clearState();
  checkRequired([email]);
  checkEmail(email);

  if (document.querySelector(".error")) {
    return false;
  } else {
    async function main() {
      emailSent();
      async function register() {
        let url = "<GSSD_EXPRESS_SERVER_API>";
        let formEmail = document.getElementById("email").value;
        let formData = {
          email: `${formEmail}`,
        };
        postData(url, formData)
          .then((data) => {
            console.log(data);
            if (data.success === true) {
              setTimeout(function () {
                window.location.href = "./forgetsuccess.html";
              }, 800);
            } else if (data.success === false && data.error === "無此用戶") {
              setTimeout(function () {
                window.location.href = "./forgetfailure.html";
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
      forgetPassword.disabled = true;
    }
    main();
  }
});

forgetPasswordMobile.addEventListener("click", function (e) {
  e.preventDefault();
  clearState();
  checkRequired([email]);
  checkEmail(email);

  if (document.querySelector(".error")) {
    return false;
  } else {
    async function main() {
      emailSent();
      async function register() {
        let url = "<GSSD_EXPRESS_SERVER_API>";
        let formEmail = document.getElementById("email").value;
        let formData = {
          email: `${formEmail}`,
        };

        postData(url, formData)
          .then((data) => {
            console.log(data);
            if (data.success === true) {
              setTimeout(function () {
                window.location.href = "./forgetsuccess.html";
              }, 800);
            } else if (data.success === false && data.error === "無此用戶") {
              setTimeout(function () {
                window.location.href = "./forgetfailure.html";
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
      forgetPasswordMobile.disabled = true;
    }
    main();
  }
});

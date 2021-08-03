const submitForm = document.getElementById("send-form");

//表單參數
const password = document.getElementById("password");
const password2 = document.getElementById("password2");
const hashVal = window.location.hash.substring(1) || `nohashvalue`;

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
  const small = document.getElementById("pw-small");
  small.innerText = `資料傳送中，請稍等`;
  small.className = "sent";
}

//Event listeners
submitForm.addEventListener("click", function (e) {
  e.preventDefault();

  checkRequired([password, password2]);
  checkLength(password, 6, 20);
  checkLength(password2, 6, 20);
  checkPasswordsMatch(password, password2);

  if (document.querySelector(".error")) {
    return false;
  } else {
    async function main() {
      emailSent();

      async function resetPW() {
        let url = `<GSSD_EXPRESS_SERVER_API>/${hashVal}`;
        let formPassword = document.getElementById("password").value;
        let formData = {
          password: `${formPassword}`,
        };

        postData(url, formData)
          .then((data) => {
            console.log(data);
            if (data.success === false) {
              setTimeout(function () {
                window.location.href = "./resetfailure.html";
              }, 800);
            } else if (data.success === true) {
              setTimeout(function () {
                window.location.href = "./resetsuccess.html";
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
            method: "PUT",
          }).then((response) => response.json());
        }
      }
      await resetPW();
      submitForm.disabled = true;
    }
    main();
  }
});


    /** Sign Up */
    
/** ايقونة كلمة السر */
document.addEventListener('DOMContentLoaded', function () {
    const togglePassword = document.querySelector('.toggle-password');
    const passwordField = document.querySelector('#fPassword');

    togglePassword.addEventListener('click', function () {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);

        // تغيير الأيقونة حسب الحالة
        this.innerHTML = type === 'password'
            ? '<i class="fa fa-eye"></i>'
            : '<i class="fa fa-eye-slash"></i>';
    });
});


let currentMode = "signup"; // ممكن يكون signup أو login أو forgot

document.getElementById("toggle-linkLogin").addEventListener("click", function (e) {
  e.preventDefault();
  if (currentMode === "signup") {
    switchToLogin();
  } else if (currentMode === "login") {
    switchToSignup();
  }
});

document.getElementById("forgot-password-link").addEventListener("click", function (e) {
  e.preventDefault();
  switchToForgot();
});

  let CardSignUp = document.getElementById("CardSign");

//  تبديل الأوضاع
function switchToLogin() {
  currentMode = "login";
  document.getElementById("form_title").innerText = "Log In";
  document.getElementById("form-button").innerText = "Log In";
  document.getElementById("toggle-linkLogin").innerText = "Sign Up";
  document.getElementById("need_account_text").innerText = "You need account?";
  document.getElementById("forgot-password").style.display = "block";
  document.getElementById("password-wrapper").style.display = "flex";
CardSignUp.style.height="85%";


}

function switchToSignup() {
  currentMode = "signup";
  document.getElementById("form_title").innerText = "Sign Up";
  document.getElementById("form-button").innerText = "Sign Up For Free";
  document.getElementById("toggle-linkLogin").innerText = "Log In";
  document.getElementById("need_account_text").innerText = "Already have an account?";
  document.getElementById("forgot-password").style.display = "none";
  document.getElementById("password-wrapper").style.display = "flex";

}

function switchToForgot() {
  currentMode = "forgot";
  document.getElementById("form_title").innerText = "Forgot Password";
  document.getElementById("form-button").innerText = "Reset Password";
  document.getElementById("need_account_text").innerText = "";
  document.getElementById("toggle-linkLogin").innerText = "";
  CardSignUp.style.height="70%";


  // إيميل يضل ظاهر
  document.getElementById("email-wrapper").style.display = "flex";
  // إخفاء الباسوورد
  document.getElementById("password-wrapper").style.display = "none";
  // إخفاء forgot password link نفسه
  document.getElementById("forgot-password").style.display = "none";
}
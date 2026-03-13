document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const savedUser = JSON.parse(localStorage.getItem("smartmom_user"));

        if (savedUser && email === savedUser.email && password === savedUser.password) {

            // simpan status login
            localStorage.setItem("login_status", "true");

            document
                .getElementById("popupLogin")
                .classList
                .add("active");

        } else {

            document.getElementById("popupIcon").classList.add("error");
            document.getElementById("popupTitle").innerText = "Login gagal";
            document.getElementById("popupText").innerText = "Email atau password salah";

            document
                .getElementById("popupLogin")
                .classList
                .add("active");

        }

    });

});

function goToHome() {
    window.location.href = "homepage.html";
}
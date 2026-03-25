document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const savedUser = JSON.parse(localStorage.getItem("smartmom_user"));

        if (!savedUser) {
            alert("Akun belum terdaftar!");
            return;
        }

        if (email === savedUser.email && password === savedUser.password) {

            localStorage.setItem("login_status", "true");

            document.getElementById("popupText").innerText = "Login berhasil, mengarahkan...";
            document.getElementById("popupLogin").classList.add("active");

            setTimeout(() => {
            window.location.href = "smartmom/html/homepage.html";
            }, 1500);

        } else {

            document.getElementById("popupIcon").classList.add("error");
            document.getElementById("popupTitle").innerText = "Login gagal";
            document.getElementById("popupText").innerText = "Periksa kembali email dan password";

            document.getElementById("popupLogin").classList.add("active");

        }

    });

});

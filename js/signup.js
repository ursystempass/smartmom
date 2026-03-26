document.addEventListener("DOMContentLoaded", function () {

const BASE = "";
    const form = document.getElementById("registerForm");
    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        const existingUser = JSON.parse(localStorage.getItem("smartmom_user"));

        if (!nama || !email || !password) {
            showErrorPopup("Isi semua data!");
            return;
        }

        if (password.length < 6) {
            showErrorPopup("Password minimal 6 karakter!");
            return;
        }

        if (existingUser && existingUser.email === email) {
            showErrorPopup("Email sudah dipakai!");
            return;
        }

        localStorage.setItem("smartmom_user", JSON.stringify({
            nama,
            email,
            password,
            anak: null
        }));

        showSuccessPopup();
    });

    if (window.feather) {
        feather.replace();
    }

});


function showErrorPopup(message) {
    const popup = document.getElementById("errorPopup");
    const text = document.getElementById("errorMessage");

    if (!popup || !text) return;

    text.textContent = message;
    popup.classList.add("active");

    setTimeout(() => {
        popup.classList.remove("active");
    }, 2000);
}


function closeErrorPopup() {
    const popup = document.getElementById("errorPopup");
    if (popup) popup.classList.remove("active");
}


function showSuccessPopup() {
    const popup = document.getElementById("popupRegister");
    if (!popup) return;

    popup.classList.add("active");

    setTimeout(() => {
window.location.href = "sign in.html";    }, 1500);
}


function togglePassword() {
    const password = document.getElementById("password");
    const icon = document.getElementById("eyeIcon");

    if (!password || !icon) return;

    if (password.type === "password") {
        password.type = "text";
        icon.setAttribute("data-feather", "eye-off");
    } else {
        password.type = "password";
        icon.setAttribute("data-feather", "eye");
    }

    if (window.feather) {
        feather.replace();
    }
}


function goToLogin() {
    window.location.href = "/smartmom/html/sign in.html";
}

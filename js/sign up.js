document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const nama = document.getElementById("nama").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const user = {
            nama: nama,
            email: email,
            password: password
        };

        localStorage.setItem("smartmom_user", JSON.stringify(user));

        document
            .getElementById("popupRegister")
            .classList
            .add("active");

    });

});

function goToLogin() {
    window.location.href = "sign in.html";
}
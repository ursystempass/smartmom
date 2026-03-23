document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");

    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        const nama = document.getElementById("nama").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        if (!nama || !email || !password) {
            alert("Semua data wajib diisi!");
            return;
        }

        if (password.length < 6) {
            alert("Password minimal 6 karakter!");
            return;
        }

        const existingUser = JSON.parse(localStorage.getItem("smartmom_user"));

        if (existingUser && existingUser.email === email) {
            alert("Email sudah terdaftar!");
            return;
        }

        const user = {
            nama: nama,
            email: email,
            password: password,
            anak: null
        };

        localStorage.setItem("smartmom_user", JSON.stringify(user));

        document.getElementById("popupRegister").classList.add("active");

    });

});
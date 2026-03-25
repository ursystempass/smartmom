const user = localStorage.getItem("smartmom_user")

if (!user) {
    window.location.href = "sign in.html"
}

function goLogin() {
    window.location.href = "sign in.html"
}

function goSignup() {
    window.location.href = "sign up.html"
}

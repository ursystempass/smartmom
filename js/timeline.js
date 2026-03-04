const tabs = document.querySelectorAll(".age-tab");

tabs.forEach(tab => {

tab.addEventListener("click", () => {

tabs.forEach(t => t.classList.remove("active"));

tab.classList.add("active");

});

});
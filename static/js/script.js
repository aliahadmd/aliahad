//navbar
document.getElementById("navbar-toggle").addEventListener("click", function () {
    var navbarLinks = document.getElementById("navbar-links");
    if (navbarLinks.className === "navbar-links") {
        navbarLinks.className += " active";
    } else {
        navbarLinks.className = "navbar-links";
    }
});

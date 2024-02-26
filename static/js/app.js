document.getElementById('navbarToggle').addEventListener('click', function() {
    var navbarMenu = document.getElementById('navbarMenu');
    this.classList.toggle('open');
    navbarMenu.classList.toggle('open');
});


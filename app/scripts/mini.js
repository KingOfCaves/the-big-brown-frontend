const navmini = document.querySelector('.navbar__mini');
const navexit = document.querySelector('.navbar__exit');
const navbar = document.querySelector('.navbar');

function openMini() {
	navbar.classList.add('open');
}

function closeMini() {
	navbar.classList.remove('open');
}

navmini.addEventListener('click', openMini);
navexit.addEventListener('click', closeMini);
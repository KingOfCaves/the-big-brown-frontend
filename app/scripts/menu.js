import menuData from './data';
const menuItems = Array.from(document.querySelectorAll('.menu__item'));

function deactivate(put) {
	put.classList.remove('active');
}

function activate() {
	if (!this.classList.contains('active')) {
		menuItems.forEach((item) => deactivate(item));		
		this.classList.add('active');
		this.scrollIntoView({
			block: 'center',
			behavior: 'smooth'
		});
	} else {
		deactivate(this);
	}
}

menuItems.forEach((item) => {
	item.addEventListener('click', activate);
})